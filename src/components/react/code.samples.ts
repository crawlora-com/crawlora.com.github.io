export interface CodeTypes{
	name: string;
	isDefault: boolean;
	value: string;
}

export const codes: CodeTypes[] = [
  {
    name: "shell",
	isDefault: true,
    value: `curl -X POST 'https://api.crawlora.com/api/v1/requests' \\
	-H 'Content-Type: application/json' \\
	-H 'x-api-key: {{apiKey}}' \\
	--data-raw \\
		'{"url":"https://crawlora.com","callbackUrl":"<string>","plugin":"<string>"}'`,
  },
  {
    name: "javascript",
	isDefault: false,
    value: `const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://api.crawlora.com/api/v1/requests',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '{{apiKey}}'
  },
  data: {
    url: 'https://crawlora.com',
    callbackUrl: '<string>',
    plugin: '<string>'
  }
};

axios.request(options)`,
  },
  {
    name: "python",
	isDefault: false,
    value: `import requests
import json

data = {
    "url": "https://crawlora.com",
    "callbackUrl": "<string>",
    "plugin": "<string>"
}

headers = {
    'Content-Type': 'application/json',
    'x-api-key': '{{apiKey}}'
}

requests.post('https://api.crawlora.com/api/v1/requests', headers=headers, data=json.dumps(data))
`,
  },
  {
    name: "php",
	isDefault: false,
    value: `<?php

$data = json_encode([
    "url" => "https://crawlora.com",
    "callbackUrl" => "<string>",
    "plugin" => "<string>"
]);

$apiKey = "{{apiKey}}";

$ch = curl_init('https://api.crawlora.com/api/v1/requests');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ' . $apiKey
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
?>
`,
  },
  {
    name: "java",
	isDefault: false,
    value: `import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        try {
            String apiKey = "{{apiKey}}";
            String data = '{"url":"https://crawlora.com","callbackUrl":"<string>","plugin":"<string>"}";
            URL url = new URL("https://api.crawlora.com/api/v1/requests");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("x-api-key", apiKey);
            conn.setDoOutput(true);
            
            try (OutputStream os = conn.getOutputStream()) {
                os.write(data.getBytes(StandardCharsets.UTF_8));
            }

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println(new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8));
            } else {
                System.err.println(new String(conn.getErrorStream().readAllBytes(), StandardCharsets.UTF_8));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
  },
];


export const getDefault = () => {
	const def = codes.findIndex((v) => v.isDefault)

	if(def === -1){
		throw new Error(`no default value found`)
	}

	return {...codes[def]}
}