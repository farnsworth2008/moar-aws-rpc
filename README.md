## Classes

<dl>
<dt><a href="#Server">Server</a></dt>
<dd><p>Server for RPC</p>
<p><p>
The Moar RPC Server aims to make standing up a JSON based RPC handler dirt simple.</p>
<p><p>
The server is implemented with a map of methods the methods are invoked with a paramter object and should return
a promise.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MethodMap">MethodMap</a> : <code>object</code></dt>
<dd><p>A map of methods with associated promise functions.</p>
<p><p>
Methods in this map are invoked with a parameter object and are expected to return a promise.</p>
</dd>
</dl>

<a name="Server"></a>

## Server
Server for RPC
<p>
The Moar RPC Server aims to make standing up a JSON based RPC handler dirt simple.
<p>
The server is implemented with a map of methods the methods are invoked with a paramter object and should return
a promise.

**Kind**: global class  

* [Server](#Server)
    * [new Server(methods)](#new_Server_new)
    * [.app()](#Server+app)

<a name="new_Server_new"></a>

### new Server(methods)
Create server


| Param | Type |
| --- | --- |
| methods | [<code>MethodMap</code>](#MethodMap) | 

<a name="Server+app"></a>

### server.app()
Returns an express app.

The following example setups a simple server greet users.  The example supports an HTTP post.

**Kind**: instance method of [<code>Server</code>](#Server)  
**Example**  
```js
const server = new Server({
     greeting: (params) => {
         return new Promise((resolve, reject) => {
             resolve(`${params.name}, your AWESOME!`)
         }
     }
})

module.exports.handler = serverless(server.app())
```
<a name="MethodMap"></a>

## MethodMap : <code>object</code>
A map of methods with associated promise functions.
<p>
Methods in this map are invoked with a parameter object and are expected to return a promise.

**Kind**: global typedef  
**Example**  
```js
{
     greeting: params => {
         return new Promise((resolve, reject) => {
             if(params.name === 'Mark')
                 resolve('Your AWESOME!')
             else
                 reject('No soup for you!')
         }
     },

     goodbye: params => {
         if(params.dying)
             resolve('Goodbye cruel world')
         else
             reject('You can checkout but you can never leave')
     }
}
```
