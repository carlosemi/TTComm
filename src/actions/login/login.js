//                                USER LOGIN

//Load User
var loadUser = async() =>{

    const ip = connectSRV();

    if(localStorage.token){
        setAuthToken(localStorage.token);
        console.log(localStorage.token)
    }
  
    try {
        //const res = await axios.get('/api/auth');

        await axios({
            method: 'get',
            url: `${ip}api/users/me`,
            headers: {
                'content-type': 'application/json',
                'x-auth-token': `${localStorage.token}`
            },
        })
        .then(async function (response) {

            console.log(response.data)

            user = response.data

            authenticate()

            //Show the clients page after being authenticated
            cliFunction()

        })
  
    } catch (err) {

        // const errors = err.response.data.errors;
  
        // if(errors) {
        //     console.log(errors)
        // }
  
        console.log(err.response)
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

            var token = response.data.token;

            localStorage.setItem('token', token)
        })
  
        loadUser()
  
    } catch (err) {
  
        const errors = err.response.data.errors;
  
        if(errors) {
            console.log(errors)
        }
    }
  }
  