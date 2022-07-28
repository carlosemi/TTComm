//                                USER LOGIN

//Load User
var loadUser = async() =>{

    const ip = connectSRV();

    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
  
    try {

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

        console.log(err.response)
    }
  }
  
  //Login User
  var login = async () => {
  
    const ip = connectSRV();
  
    const username = $('#username').val()
    const password = $("#password").val()
  
    try {

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

            // console.log(response.data)

            var token = response.data.token;

            localStorage.setItem('token', token)
        })
  
        loadUser()
  
    } catch (err) {
  
        // const errors = err.response.data.errors;
  
        // if(errors) {
        //     console.log(errors)
        // }

        console.log(err)
    }
  }
  