<script>

  // import Bt from '/imports/bluetooth-serial-wrapper.js'

  let ourName = "red1";

  let messages = [
    {
      sender: ourName,
      message: "Hello Blue"
    },
    {
      sender: "blue1",
      message: "Hello Red"
    },
    {
      sender: ourName,
      message: "Great day"
    }
  ];

  function sendMessage(e) {
    console.log(e.target.message.value)

    messages = [...messages, {
      sender: ourName,
      message: e.target.message.value
    }];

    e.target.message.value = "";
  }
  let isConnected = false;
  let updatedConnectedHandle = null; // this is for polling, would be nice to have an event

  const updateConectedFreqSec = 3;
  async function updatedConnected() {
    isConnected = await Bt.isConnected();

    //@todo this doesn't seem to be working
    updatedConnectedHandle = setTimeout(updatedConnected(), updateConectedFreqSec * 1000);
  }
  updatedConnected();

  let pairedDevices = [];
  let showConnectModal = false;

  async function connectModal() {
    // show spinner
    let pairedDevices = await Bt.listPaired();
    showConnectModal = true;
  }

</script>

<div class="root">
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="bootstrap" viewBox="0 0 118 94">
      <title>Bootstrap</title>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
    </symbol>
  </svg>
  <header class="p-3 mb-2 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none fs-3 fst-italic pe-2">
          Chat
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <!-- <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li> -->
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form> -->

        <div class="text-end">
          {#if isConnected == true}
          <button type="button" class="btn btn-warning" on:click={Bt.disconnect}>Disconnect</button>
          {:else}
          <button type="button" class="btn btn-outline-light me-2" on:click={connectModal}>Connect</button>
          <button type="button" class="btn btn-outline-light me-2" on:click={()=>{Bt.setDiscoverable(120)}}>Make Discoverable</button>
          {/if}
        </div>
      </div>
    </div>
  </header>
  <div class="container">

    <ul class="list-group mb-9">
      {#each messages as message}
        <li class="list-group-item" class:text-end={message.sender!==ourName}>{message.sender}: {message.message}</li>
      {/each}
    </ul>

    <form class="input-group p-2 fixed-bottom bg-light" on:submit|preventDefault={sendMessage}>
      <input type="text" class="form-control" name="message" id="message" placeholder="Message" >
      <button class="btn btn-primary" type="submit">Send</button>
    </form>
  </div>

  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

