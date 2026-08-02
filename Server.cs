using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

class WebServer {
    static void Main(string[] args) {
        int port = 3000;
        string root = @"c:\Users\harsh\OneDrive\Documents\ANTIGRAVITY";

        TcpListener server = null;
        try {
            server = new TcpListener(IPAddress.Any, port);
            server.Start();
            Console.WriteLine("FinPulse Server listening on ALL interfaces (0.0.0.0:" + port + ")");
        } catch (Exception ex) {
            Console.WriteLine("Error starting TcpListener: " + ex.Message);
            return;
        }

        while (true) {
            try {
                TcpClient client = server.AcceptTcpClient();
                ThreadPool.QueueUserWorkItem(state => {
                    try {
                        using (NetworkStream stream = client.GetStream()) {
                            // Read HTTP request line
                            byte[] reqBuffer = new byte[4096];
                            int readCount = stream.Read(reqBuffer, 0, reqBuffer.Length);
                            if (readCount <= 0) { client.Close(); return; }

                            string reqText = Encoding.UTF8.GetString(reqBuffer, 0, readCount);
                            string[] lines = reqText.Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);
                            if (lines.Length == 0) { client.Close(); return; }

                            string[] parts = lines[0].Split(' ');
                            if (parts.Length < 2) { client.Close(); return; }

                            string rawUrl = parts[1].TrimStart('/');
                            if (string.IsNullOrEmpty(rawUrl) || rawUrl == "/") rawUrl = "index.html";

                            int qIdx = rawUrl.IndexOf('?');
                            if (qIdx >= 0) rawUrl = rawUrl.Substring(0, qIdx);

                            string filePath = Path.Combine(root, rawUrl.Replace('/', Path.DirectorySeparatorChar));

                            if (File.Exists(filePath)) {
                                byte[] bytes = File.ReadAllBytes(filePath);
                                string ext = Path.GetExtension(filePath).ToLower();
                                string mime = "application/octet-stream";

                                switch (ext) {
                                    case ".html": mime = "text/html; charset=utf-8"; break;
                                    case ".css": mime = "text/css"; break;
                                    case ".js": mime = "text/javascript"; break;
                                    case ".json": mime = "application/json"; break;
                                    case ".svg": mime = "image/svg+xml"; break;
                                    case ".png": mime = "image/png"; break;
                                    case ".jpg": mime = "image/jpeg"; break;
                                }

                                string header = "HTTP/1.1 200 OK\r\n" +
                                                "Content-Type: " + mime + "\r\n" +
                                                "Content-Length: " + bytes.Length + "\r\n" +
                                                "Access-Control-Allow-Origin: *\r\n" +
                                                "Connection: close\r\n\r\n";
                                byte[] headerBytes = Encoding.UTF8.GetBytes(header);
                                stream.Write(headerBytes, 0, headerBytes.Length);
                                stream.Write(bytes, 0, bytes.Length);
                            } else {
                                string notFound = "HTTP/1.1 404 Not Found\r\nContent-Length: 13\r\nConnection: close\r\n\r\n404 Not Found";
                                byte[] errorBytes = Encoding.UTF8.GetBytes(notFound);
                                stream.Write(errorBytes, 0, errorBytes.Length);
                            }
                        }
                    } catch {
                        // ignore client disconnect
                    } finally {
                        try { client.Close(); } catch {}
                    }
                });
            } catch {
                // continue accepting
            }
        }
    }
}
