package dev.pingclash.test;

import android.app.Activity;
import android.content.Intent;
import android.content.ComponentName;
import java.io.File;
import android.os.Bundle;
import android.os.ResultReceiver;
import java.io.ByteArrayOutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/** A framework-only activity in the test APK's separate UID, never in a release APK. */
public final class PeerActivity extends Activity {
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        final ResultReceiver receiver = getIntent().getParcelableExtra("receiver");
        final String host = getIntent().getStringExtra("host");
        new Thread(() -> {
            Bundle result = new Bundle();
            try {
                startService(new Intent().setComponent(new ComponentName("dev.pingclash.app", "dev.pingclash.app.PingVpnService"))
                    .setAction("dev.pingclash.DISCONNECT"));
                result.putBoolean("serviceDenied", false);
            } catch (SecurityException expected) { result.putBoolean("serviceDenied", true); }
            result.putBoolean("privateFileDenied", !new File("/data/user/0/dev.pingclash.app/files/profiles.enc").canRead());
            String stage = "dns";
            try {
                InetAddress address = InetAddress.getByName(host);
                stage = "connect";
                try (Socket socket = new Socket()) {
                    socket.connect(new InetSocketAddress(address, 8080), 8000);
                    socket.setSoTimeout(8000);
                    socket.getOutputStream().write("GET /peer HTTP/1.1\r\nHost: fixture.test\r\nConnection: close\r\n\r\n".getBytes(StandardCharsets.US_ASCII));
                    stage = "response";
                    ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                    byte[] buffer = new byte[1024];
                    int count;
                    while ((count = socket.getInputStream().read(buffer)) >= 0 && bytes.size() < 8192) bytes.write(buffer, 0, count);
                    result.putBoolean("success", bytes.toString("US-ASCII").startsWith("HTTP/1.1 204"));
                }
            } catch (Exception failure) { result.putBoolean("success", false); result.putString("stage", stage); }
            if (receiver != null) receiver.send(0, result);
            runOnUiThread(this::finish);
        }, "controlled-vpn-peer").start();
    }
}
