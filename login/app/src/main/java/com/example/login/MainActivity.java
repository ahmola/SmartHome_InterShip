package com.example.login;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.net.URL;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class MainActivity extends AppCompatActivity {
    ProgressDialog dialog;
    Handler handler = new Handler();
    Socket socket;
    EditText EditID;
    EditText Editpassword;
    String ID;
    String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EditID = (EditText) findViewById(R.id.txtEdit1);
        Editpassword = (EditText) findViewById(R.id.txtEdit2);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        socket.emit("disconnect", null);
        socket.disconnect();
    }

    public void onbtnConnectClicked(View v){
        if(socket != null)
            return;
        try{
            socket = IO.socket("http://59.5.55.206:3000");
            socket.connect();
            Toast.makeText(getApplicationContext(), "Connected and Waiting...", Toast.LENGTH_LONG).show();
            socket.on("SEND", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            try{
                                JSONObject data = (JSONObject) args[0];
                                Toast.makeText(getApplicationContext(), "python ans: " + data.getString("message"), Toast.LENGTH_LONG).show();
                            }catch(Exception e){
                                Toast.makeText(getApplicationContext(), e.getMessage(),
                                        Toast.LENGTH_LONG).show();
                                e.printStackTrace();
                            }
                        }
                    });
                }
            });
        }catch (Exception e){
            Toast.makeText(getApplicationContext(), e.getMessage(),
                    Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }

    public void onbtnSendClicked(View v) {
        dialog = new ProgressDialog(MainActivity.this);
        dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        dialog.setMessage("데이터 확인 중...");

        dialog.show();

        ID = EditID.getText().toString();
        password = Editpassword.getText().toString();

        if(socket != null){
            JSONObject data = new JSONObject();
            try{
                data.put("message", ID + " " + password);
                socket.emit("SEND", data);
                Toast.makeText(getApplicationContext(), "Done!", Toast.LENGTH_SHORT).show();
            }catch (Exception e){
                Toast.makeText(getApplicationContext(), e.getMessage(),
                        Toast.LENGTH_LONG).show();
                e.printStackTrace();
            }
        }
        dialog.hide();
    }
}