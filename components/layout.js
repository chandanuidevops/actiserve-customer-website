import React, {Component} from 'react'

import {node} from 'prop-types'

import Router from 'next/router'

Router.onRouteChangeComplete = () => {
  document.querySelectorAll('.spinner').forEach(el => {
    el.classList.remove('spinner')
  })
}

class App extends Component {
  static propTypes = {
    children: node,
  }

  componentDidMount() {
    if (typeof window === 'undefined') return
    Router.prefetch('/sync')
    Router.prefetch('/async')
  }

  handleClick = target => {
    Router.push(target)
  }

  render() {
    return (
      <main>
        {/* <a onClick={() => this.handleClick('/')}>
          Home
        </a>
        <a onClick={() => this.handleClick('/sync')}>
          Sync
        </a>
        <a onClick={() => this.handleClick('/async')}>
          Async
        </a> */}
        {this.props.children}
       
      </main>
    )
  }
}

export default App
