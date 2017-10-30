ajax({
  url: "api",
  type: "POST",
  data: {
    name: "Your Name",
    email: "Your Email"
  },
  headers: {
    token: "qwertyuiopasdfghjk"
  },
  dataTye: "json",
  success: function(response){
    // Process your data here e.g:
    console.log(response.message);
  }
});