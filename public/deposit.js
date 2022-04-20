function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ?
        <DepositForm setShow={setShow} setStatus={setStatus} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Deposit again
    </button>
  </>);
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const currUser = JSON.parse(localStorage.getItem("curr_user"));

  function handle() {
    if (currUser) {
      var userEmail = currUser.email;
    } else {
      var userEmail = email;
    }
    fetch(`/account/update/${userEmail}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log('JSON:', data);
          localStorage.setItem("curr_user", JSON.stringify(data.value))
        } catch (err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
        }
      });
  }

  return (<>

    {currUser ? (

      <>
        <label>Balance: {currUser.balance}</label><br />
        Email<br />
        <input type="input"
          className="form-control"
          placeholder={currUser.email}
          readOnly
          value={currUser.email} /><br />
      </>

    ) : (
      <>
        Email<br />
        <input type="input"
          className="form-control"
          placeholder="Enter email"
          value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
      </>

    )
    }


    Amount<br />
    <input type="number"
      className="form-control"
      placeholder="Enter amount"
      value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>Deposit</button>

  </>);
}