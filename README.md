<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="Chat_Application_with_NestJs_and_Websocket_0"></a>Chat Application with NestJs and Websocket</h2>
<p class="has-line-data" data-line-start="3" data-line-end="4">User can create public room and chat with other users in that room.</p>
<h2 class="code-line" data-line-start=5 data-line-end=6 ><a id="Installation_5"></a>Installation</h2>
<pre><code class="has-line-data" data-line-start="8" data-line-end="10" class="language-bash">npm install
</code></pre>
<h2 class="code-line" data-line-start=11 data-line-end=12 ><a id="Running_the_app_11"></a>Running the app</h2>
<pre><code class="has-line-data" data-line-start="14" data-line-end="20" class="language-bash"><span class="hljs-comment"># development</span>
npm run start

<span class="hljs-comment"># watch mode</span>
npm run start:dev
</code></pre>
<h2 class="code-line" data-line-start=21 data-line-end=22 ><a id="Packages_Added_21"></a>Packages Added</h2>
<pre><code class="has-line-data" data-line-start="24" data-line-end="27" class="language-shell">npm i --save @nestjs/websockets @nestjs/platform-socket.io ngx-socket-io
npm i --save-dev @types/socket.io
</code></pre>
<h2 class="code-line" data-line-start=29 data-line-end=30 ><a id="APIs_29"></a>APIs</h2>
<ul>
<li class="has-line-data" data-line-start="31" data-line-end="47">
<h3 class="code-line" data-line-start=31 data-line-end=32 ><a id="Create_room_31"></a>Create room:</h3>
<h4 class="code-line" data-line-start=33 data-line-end=34 ><a id="Resource_33"></a>Resource:</h4>
<pre><code>Post  /chat-room/join
</code></pre>
<h4 class="code-line" data-line-start=36 data-line-end=37 ><a id="Request_Body_36"></a>Request Body:</h4>
<pre><code>  name: string
  connectedUser: string
</code></pre>
<h4 class="code-line" data-line-start=39 data-line-end=40 ><a id="Response_39"></a>Response:</h4>
<pre><code>  User will be redirected to respective room.
</code></pre>
<h4 class="code-line" data-line-start=42 data-line-end=43 ><a id="Example_42"></a>Example:</h4>
<pre><code class="has-line-data" data-line-start="44" data-line-end="47" class="language-shell">curl --location --request POST 'http://localhost:3000/chat-room/join' \
--form 'name=&quot;Node&quot;' \
--form 'connectUser=&quot;Neha&quot;'
</code></pre>
</li>
</ul>
<h2 class="code-line" data-line-start=47 data-line-end=48 ><a id="Web_Socket_Gateway_47"></a>Web Socket Gateway</h2>
<ul>
<li class="has-line-data" data-line-start="50" data-line-end="97">
<h3 class="code-line" data-line-start=50 data-line-end=51 ><a id="Events_50"></a>Events:</h3>
<p class="has-line-data" data-line-start="51" data-line-end="52">we are having following events:</p>
<h2 class="code-line" data-line-start=53 data-line-end=54 ><a id="JoinRoom_53"></a><code>JoinRoom</code></h2>
<pre><code>  Payload: 
   { 
          roomId : string;
          UserId : string;
  }


when user will join the room this event will be emitted from the client side with payload.
</code></pre>
<h2 class="code-line" data-line-start=63 data-line-end=64 ><a id="ChatToServer_63"></a><code>ChatToServer</code></h2>
<pre><code> Payload: 
  { 
      roomId : string;
      userId : string;
      message : string;
  }
  
  
   This event will be emitted from client side when the user 
   will send the message in the room with request payload.
</code></pre>
<h2 class="code-line" data-line-start=75 data-line-end=76 ><a id="LeaveRoom_75"></a><code>LeaveRoom</code></h2>
<pre><code>Payload: 
  { 
      roomId : string;
      userId : string;
      message : string;
  }


When the user leave the room this event will be emitted from client side with requested payload.
</code></pre>
<h2 class="code-line" data-line-start=86 data-line-end=87 ><a id="Message_86"></a><code>Message</code></h2>
<pre><code>Payload: 
  { 
      name : string;
      content : string;
      createdAt : timestamp;
  }


This event will be listent by client side when message will be emitted from server.
</code></pre>
</li>
<li class="has-line-data" data-line-start="97" data-line-end="100">
<h3 class="code-line" data-line-start=97 data-line-end=98 ><a id="License_97"></a>License:</h3>
<p class="has-line-data" data-line-start="98" data-line-end="99">Pypestream-chat-room is MIT licensed.</p>
</li>
</ul>
