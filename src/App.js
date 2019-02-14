import React, { Component } from 'react';
import TokenForm from './TokenForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-auto">
          <TokenForm />
        </div>
      </div>
    );
  }
}

export default App;


// <html>
//   <head>
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//     <script src="/static/index.js"></script>
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
//     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
//     <link rel="stylesheet" type="text/css" href="/static/xdai.css">
//     <!-- <link rel="stylesheet" href="/static/burnerwallet.css"> -->
//     <!-- <link rel="stylesheet" href="/static/buffidai.css"> -->
//   </head>
//
//   <body>
//     <div class="mt-4 mb-4 heading">
//       <img src="/static/whiteburn.png" height="70">
//     </div>
//
//     <div class="row mt-2">
//       <div class="col-md-6 m-auto">
//           <div class="card card-body">
//
//             <div id="has-wallet" class="d-none">
//               <div style="border: 2px solid #686868; padding: 15px">
//                 <h5 id="client-url" class="text-center title-one"></h5>
//                 <h1 id="client-name" class="text-center font-weight-bold"></h1>
//               </div>
//               <h5 class="text-center mt-5">is requesting access to your burner wallet's address:</h5>
//               <p id="wallet-address" class="text-center"></p>
//               <button id="confirm" type="submit" class="btn btn-primary btn-block auth-btn"><i class="fa fa-check-circle"> Allow</i></button>
//             </div>
//
//             <div id="no-wallet" class="m-auto d-none">
//               <p class="mt-5">
//                 It appears you don't have a wallet setup yet.
//               </p>
//               <p>
//                 If you previously had one, but don't see it now it might be because you:
//               </p>
//               <ul>
//                 <li>Previously used a web3 provider such as Metamask</li>
//                 <li>Changed browsers</li>
//                 <li>Cleared your local storage</li>
//               </ul>
//
//               <p>The Burner Wallet won't create you a new ephemeral wallet if you are using a web3 provider such as Metamask.</p>
//               <button id="generate-wallet" class="btn btn-primary btn-block auth-btn w-50 m-auto">Generate Wallet</button>
//             </div>
//
//           </div>
//       </div>
//     </div>
//   </body>
// </html>
