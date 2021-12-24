<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="Chat_Application_with_NestJs_and_Websocket_0"></a>Chat Application with NestJs and Websocket</h2>
<p class="has-line-data" data-line-start="3" data-line-end="4">User can create public room and chat with other users in that room.</p>
 <h2 class="code-line" data-line-start=21 data-line-end=22 ><a id="Prerequisite_Added_21"></a>Prerequisite</h2>
<ul>
<li>Docker</li>
<li>Docker Composer</li>
</ul>

<h2 class="code-line" data-line-start=21 data-line-end=22 ><a id="Prerequisite_Added_21"></a>Configuration details</h2>

<p class="has-line-data" data-line-start="3" data-line-end="4">User need to create .env file on root folder and paste the content from .env.sample file </p>

<h2 class="code-line" data-line-start=11 data-line-end=12 ><a id="Running_the_app_11"></a>Running app with docker</h2>
<pre><code class="has-line-data" data-line-start="14" data-line-end="20" class="language-bash"><span class="hljs-comment"># development</span>
docker-compose up --build
docker-compose up -d --build
<h2 class="code-line" data-line-start=21 data-line-end=22 ><a id="Packages_Added_21"></a>Packages Used</h2>
<ul>
<li><a href="https://www.npmjs.com/package/mongoose">Mongoose</a></li>
<li><a href="https://www.npmjs.com/package/socket.io">Socket.io</a></li>
<li><a href="https://www.npmjs.com/package/moment">Moment</a></li>
</ul>

<h2 class="code-line" data-line-start=28 data-line-end=29 ><a id="APIs_28"></a>APIs</h2>
<ul>
<li><a href="https://www.postman.com/collections/f87fb8f47e93335fdee6">Postman collection</a></li>
</ul>
<h2 class="code-line" data-line-start=46 data-line-end=47 ><a id="Web_Socket_Gateway_46"></a>Web Socket Gateway</h2>
<ul>
<li class="has-line-data" data-line-start="49" data-line-end="96">
<h3 class="code-line" data-line-start=49 data-line-end=50 ><a id="Events_49"></a>Events:</h3>
<p class="has-line-data" data-line-start="50" data-line-end="51">We are having following events:</p>
<h2 class="code-line" data-line-start=52 data-line-end=53 ><a id="JoinRoom_52"></a><code>JoinRoom</code></h2>
<pre><code> Payload: 
  { 
      roomId : string;
      UserId : string;
  }
<br>
when user will join the room this event will be emitted from the client side with payload.</code></pre>

<h2 class="code-line" data-line-start=62 data-line-end=63 ><a id="ChatToServer_62"></a><code>ChatToServer</code></h2>
<pre><code> Payload: 
  { 
      roomId : string;
      userId : string;
      message : string;
  }
  <br>
  
This event will be emitted from client side when the will send the message in the room with request payload.
</code></pre>
<h2 class="code-line" data-line-start=74 data-line-end=75 ><a id="LeaveRoom_74"></a><code>LeaveRoom</code></h2>
<pre><code> Payload: 
  { 
      roomId : string;
      userId : string;
      message : string;
  }
<br>
When the user leave the room this event will be emitted from client side with requested payload.
</code></pre>

<h2 class="code-line" data-line-start=85 data-line-end=86 ><a id="Message_85"></a><code>Message</code></h2>
<pre><code> Payload: 
  { 
      name : string;
      content : string;
      createdAt : timestamp;
  }
<br>
This event will be listent by client side when message will be emitted from server.
</code></pre>

</li>
</ul>
<h2 class="code-line" data-line-start=61 data-line-end=62 ><a id="Screenshots_61"></a>Screenshots</h2>
<p>
![Screenshot_chat](Screenshot_create.png)
</p>
<ul>
<li class="has-line-data" data-line-start="96" data-line-end="99">
<h3 class="code-line" data-line-start=96 data-line-end=97 ><a id="License_96"></a>License:</h3>
<p class="has-line-data" data-line-start="97" data-line-end="98">Pypestream-chat-room is MIT licensed.</p>
</li>
</ul>

