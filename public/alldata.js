function AllData(){
    const [data, setData] = React.useState('');    

    React.useEffect(() => {
        document.getElementById('allData').innerHTML = "Loading...";
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        <div id="allData">{data}</div>
    </>);
}
