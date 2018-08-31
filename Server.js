'use strict'

const attach = require('farnsworth-attach')
const express = require('express')
const bodyParser = require('body-parser')

/**
 * @typedef MethodMap {object}
 *
 * A map of methods with associated promise functions.
 * <p>
 * Methods in this map are invoked with a parameter object and are expected to return a promise.
 *
 * @example
 * {
 *      greeting: params => {
 *          return new Promise((resolve, reject) => {
 *              if(params.name === 'Mark')
 *                  resolve('Your AWESOME!')
 *              else
 *                  reject('No soup for you!')
 *          }
 *      },
 *
 *      goodbye: params => {
 *          if(params.dying)
 *              resolve('Goodbye cruel world')
 *          else
 *              reject('You can checkout but you can never leave')
 *      }
 */

/**
 * Server for RPC
 * <p>
 * The Moar RPC Server aims to make standing up a JSON based RPC handler dirt simple.
 * <p>
 * The server is implemented with a map of methods the methods are invoked with a paramter object and should return
 * a promise.
 */
class Server {

    /**
     * Returns an express app.
     *
     * The following example setups a simple server greet users.  The example supports an HTTP post.
     *
     * @example
     * const server = new Server({
     *      greeting: (params) => {
     *          return new Promise((resolve, reject) => {
     *              resolve(`${params.name}, your AWESOME!`)
     *          }
     *      }
     * })
     *
     * module.exports.handler = serverless(server.app())
     *
     */
    app() {}

    /**
     * Create server
     * @param methods {MethodMap}
     */
    constructor(methods) { server(this, methods) }
}

module.exports = Server

function server(T, methods) {
    const app_ = express()
    app_.use(bodyParser.json({ strict: false }))
    attach(T, function app() { return app_ })

    const methodNames = Object.keys(methods)
    for(let method of methodNames) {
        app_.post(`/${method}`, (req, res) => {
            methods[method](req.body)
            .then(result => {
                res.status(200).send(result)
            }).catch(err => {
                res.status(500).send(err)
            })
        })
    }
}