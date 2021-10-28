//                                USER LOGIN

console.log("Loo")
//Load User
var loadUser = async() =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
  
    try {
        const res = await axios.get('/api/auth');
  
    } catch (err) {
  
    }
  }
  
  //Login User
  var login = async () => {
  
    const ip = connectSRV();
    //const token = getToken();

    console.log("login")
  
    const username = $('#username').val()
    const password = $("#password").val()
  
    console.log(username, password)
  
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
  
    //const body = JSON.stringify({email,password});
  
    try {
        //const res = await axios.post('/api/auth', body, config);

        await axios({
            method: 'post',
            url: `${ip}api/auth`,
            headers: {
                'content-type': 'application/json',
            },
            data: {
                username: username,
                password: password
            }
        })
        .then(async function (response) {

            console.log(response.data)
        })
  
        //oadUser()
  
    } catch (err) {
  
        const errors = err.response.data.errors;
  
        if(errors) {
            console.log(errors)
        }
    }
  }
  