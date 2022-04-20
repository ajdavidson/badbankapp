function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ?
        <LoginForm setShow={setShow} setStatus={setStatus} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function LoginMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>
      Continue
    </button>
  </>);
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  //
  const currUser = JSON.parse(localStorage.getItem("curr_user"));
  console.log(currUser);
  //console.log(currUser[0].email);
  
  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
          console.log('Logged In:', data.email);
          localStorage.setItem("curr_user", JSON.stringify(data));
        } catch (err) {
          props.setStatus(text)
          console.log('err:', text);
        }
      });
  }
  function logOut() {
    localStorage.clear();
    window.location.reload(true);
  }

  return (<>
    {currUser ? (

      <>
        <label>You are Logged In as {currUser.email}</label>
        <button type="submit" className="btn btn-light" onClick={logOut}>Log Out</button>
      </>

    ) : (
      <>
        Email<br />
        <input type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)} /><br />

        Password<br />
        <input type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)} /><br />

        <button type="submit" className="btn btn-light" onClick={handle}>Login</button></>
    )
    }


  </>);
}