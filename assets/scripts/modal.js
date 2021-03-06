'use strict';
import React from 'react';
import { createPortal } from 'react-dom';
import { PropTypes as T } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export class Modal extends React.Component {
  constructor (props) {
    super(props);

    this.componentAddedBodyClass = false;

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.keyListener = this.keyListener.bind(this);

    this.el = document.createElement('div');
    this.el.className = `modal-portal-${Math.random().toString()}`;
    this.rootEl = document.body;
    if (!this.rootEl) throw new Error('Portal root element does not exist.');
  }

  keyListener (e) {
    // ESC.
    if (this.props.revealed && e.keyCode === 27) {
      e.preventDefault();
      this.props.onCloseClick();
    }
  }

  // closeModal () {
  //   this.setState({ revealed: false });
  // },

  // openModal () {
  //   this.setState({ revealed: true });
  // },

  // getInitialState () {
  //   return {
  //     revealed: this.props.revealed
  //   };
  // },

  toggleBodyClass (revealed) {
    let bd = document.getElementsByTagName('body')[0];
    if (revealed) {
      this.componentAddedBodyClass = true;
      bd.classList.add('modal__unscrollable-y');
    } else if (this.componentAddedBodyClass) {
      // Only act if the class was added by this component.
      this.componentAddedBodyClass = false;
      bd.classList.remove('modal__unscrollable-y');
    }
  }

  componentDidUpdate () {
    this.toggleBodyClass(this.props.revealed);
  }

  componentDidMount () {
    document.addEventListener('keyup', this.keyListener);
    this.toggleBodyClass(this.props.revealed);

    this.rootEl.appendChild(this.el);
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.keyListener);
    this.toggleBodyClass(false);

    this.rootEl.removeChild(this.el);
  }

  onOverlayClick (e) {
    // Prevent children from triggering this.
    if (e.target === e.currentTarget) {
      // Overlay click is disabled.
      // this.props.onOverlayClick.call(this, e);
    }
  }

  onCloseClick (e) {
    e.preventDefault();
    this.props.onCloseClick(e);
  }

  getChild (klass) {
    let c = null;
    React.Children.forEach(this.props.children, o => {
      if (!c && o.type === klass) {
        c = o;
      }
    });
    return c;
  }

  render () {
    var klasses = ['modal'];
    if (this.props.className) {
      klasses.push(this.props.className);
    }

    return createPortal((
        <CSSTransition
          in={this.props.revealed}
          appear={true}
          unmountOnExit={true}
          classNames='modal'
          timeout={{ enter: 300, exit: 300 }}>

          <section className={klasses.join(' ')} key={'modal-' + this.props.id} onClick={this.onOverlayClick} id={this.props.id}>
            <div className='modal__inner'>
              {this.getChild(ModalHeader)}
              {this.getChild(ModalBody)}
              {this.getChild(ModalFooter)}
            </div>
            <button className='mma-xmark' title='Close' onClick={this.onCloseClick}><span>Dismiss</span></button>
          </section>

        </CSSTransition>
    ), this.el);
  }
}

Modal.defaultProps = {
  revealed: false,

  onOverlayClick: function (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Modal', 'onOverlayClick handler not implemented');
    }
  },

  onCloseClick: function (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Modal', 'onCloseClick handler not implemented');
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  Modal.propTypes = {
    id: T.string.isRequired,
    revealed: T.bool,
    className: T.string,
    onOverlayClick: T.func,
    onCloseClick: T.func,
    children: function (props, propName, componentName) {
      let types = ['ModalHeader', 'ModalBody', 'ModalFooter'];
      let typesRequired = ['ModalHeader', 'ModalBody'];
      let children = React.Children.toArray(props[propName]);

      let c = children.length;
      if (c === 0 || c > 3) {
        return new Error(`${componentName} should have at least a child but no more than 3`);
      }

      let components = {};

      for (let i = 0; i < c; i++) {
        let o = children[i];
        let name = o.type.name;
        if (types.indexOf(name) === -1) {
          return new Error(`${componentName} children should be of the following types: ${types.join(', ')}`);
        }
        if (!components[name]) {
          components[name] = 0;
        }
        if (++components[name] > 1) {
          return new Error(`${componentName} should have only one instance of: ${name}`);
        }
      }

      for (let i = 0; i < typesRequired.length; i++) {
        if (!components[typesRequired[i]]) {
          return new Error(`${componentName} should have a ${typesRequired[i]}`);
        }
      }
    }
  };
}

export class ModalHeader extends React.Component {
  render () {
    return (
      <header className='modal__header'>
        {this.props.children}
      </header>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ModalHeader.propTypes = {
    children: T.node
  };
}

export class ModalBody extends React.Component {
  render () {
    return (
      <div className='modal__body'>
        {this.props.children}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ModalBody.propTypes = {
    children: T.node
  };
}

export class ModalFooter extends React.Component {
  render () {
    return (
      <footer className='modal__footer'>
        {this.props.children}
      </footer>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ModalFooter.propTypes = {
    children: T.node
  };
}

// 'use strict';
// import createReactClass from 'create-react-class'
// import React from 'react';
// import TetherComponent from 'react-tether';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import PropTypes from 'prop-types';
// // React.PropTypes = PropTypes;
// React.createClass = createReactClass;

// var Modal = React.createClass({
//   displayName: 'Modal',

//   propTypes: {
//     id: React.PropTypes.string.isRequired,
//     revealed: React.PropTypes.bool,
//     className: React.PropTypes.string,
//     onOverlayClick: React.PropTypes.func,
//     onCloseClick: React.PropTypes.func,

//     children: function (props, propName, componentName) {
//       let types = ['ModalHeader', 'ModalBody', 'ModalFooter'];
//       let typesRequired = ['ModalHeader', 'ModalBody'];
//       let children = React.Children.toArray(props[propName]);

//       let c = children.length;
//       if (c === 0 || c > 3) {
//         return new Error(`${componentName} should have at least a child but no more than 3`);
//       }

//       let components = {};

//       for (let i = 0; i < c; i++) {
//         let o = children[i];
//         let name = o.type.displayName || o.type;
//         if (types.indexOf(name) === -1) {
//           return new Error(`${componentName} children should be of the following types: ${types.join(', ')}`);
//         }
//         if (!components[name]) {
//           components[name] = 0;
//         }
//         if (++components[name] > 1) {
//           return new Error(`${componentName} should have only one instance of: ${name}`);
//         }
//       }

//       for (let i = 0; i < typesRequired.length; i++) {
//         if (!components[typesRequired[i]]) {
//           return new Error(`${componentName} should have a ${typesRequired[i]}`);
//         }
//       }
//     }
//   },

//   // closeModal: function () {
//   //   this.setState({ revealed: false });
//   // },

//   // openModal: function () {
//   //   this.setState({ revealed: true });
//   // },

//   // getInitialState: function () {
//   //   return {
//   //     revealed: this.props.revealed
//   //   };
//   // },

//   toggleUnscrollableClass: function (revealed) {
//     let bd = document.documentElement;
//     if (revealed) {
//       bd.classList.add('unscrollable-y');
//     } else {
//       bd.classList.remove('unscrollable-y');
//     }
//   },

//   componentDidUpdate: function () {
//     this.toggleUnscrollableClass(this.props.revealed);
//   },

//   componentDidMount: function () {
//     this.toggleUnscrollableClass(this.props.revealed);
//   },

//   componentWillUnmount: function () {
//     this.toggleUnscrollableClass(false);
//   },

//   getDefaultProps: function () {
//     return {
//       revealed: false,

//       onOverlayClick: function (e) {
//         if (process.env.NODE_ENV !== 'production') {
//           console.warn('Modal', 'onOverlayClick handler not implemented');
//         }
//       },

//       onCloseClick: function (e) {
//         if (process.env.NODE_ENV !== 'production') {
//           console.warn('Modal', 'onCloseClick handler not implemented');
//         }
//       }
//     };
//   },

//   onOverlayClick: function (e) {
//     // Prevent children from triggering this.
//     if (e.target === e.currentTarget) {
//       // Overlay click is disabled.
//       // this.props.onOverlayClick.call(this, e);
//     }
//   },

//   onCloseClick: function (e) {
//     e.preventDefault();
//     this.props.onCloseClick.call(this, e);
//   },

//   getChild: function (name) {
//     let c = null;
//     React.Children.forEach(this.props.children, o => {
//       if (!c && o.type.displayName === name) {
//         c = o;
//         return;
//       }
//     });
//     return c;
//   },

//   render: function () {
//     var klasses = ['modal'];
//     if (this.props.className) {
//       klasses.push(this.props.className);
//     }

//     return (
//       <ReactCSSTransitionGroup
//         component='div'
//         transitionName='modal'
//         transitionEnterTimeout={300}
//         transitionLeaveTimeout={300} >

//         {this.props.revealed ? (
//           <section className={klasses.join(' ')} key={'modal-' + this.props.id} onClick={this.onOverlayClick} id={this.props.id}>
//             <div className='modal__inner'>
//               {this.getChild('ModalHeader')}
//               {this.getChild('ModalBody')}
//               {this.getChild('ModalFooter')}
//             </div>
//             <button className='modal__button-dismiss' title='Close' onClick={this.onCloseClick}><span>Dismiss</span></button>
//           </section>
//         ) : null}

//       </ReactCSSTransitionGroup>
//     );
//   }
// });

// var ModalHeader = React.createClass({
//   displayName: 'ModalHeader',

//   propTypes: {
//     children: React.PropTypes.node
//   },

//   render: function () {
//     return (
//       <header className='modal__header'>
//         {this.props.children}
//       </header>
//     );
//   }
// });

// var ModalBody = React.createClass({
//   displayName: 'ModalBody',

//   propTypes: {
//     children: React.PropTypes.node
//   },

//   render: function () {
//     return (
//       <div className='modal__body'>
//         {this.props.children}
//       </div>
//     );
//   }
// });

// var ModalFooter = React.createClass({
//   displayName: 'ModalFooter',

//   propTypes: {
//     children: React.PropTypes.node
//   },

//   render: function () {
//     return (
//       <footer className='modal__footer'>
//         {this.props.children}
//       </footer>
//     );
//   }
// });

// module.exports = {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter
// };