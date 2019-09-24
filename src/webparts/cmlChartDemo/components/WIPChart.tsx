import * as React from 'react';
import {Doughnut} from 'react-chartjs-2';
import pnp from "@pnp/pnpjs";
import * as Fabric from 'office-ui-fabric-react';

const data = {
	labels: [
		'Pending with Legal',
		'Pending with Regional',
		'Pending with Global'
	],
	datasets: [{
		data: [],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

function WIPChart(props) {
	let[loading, setLoading] = React.useState(true)
	let[hasError, setError] = React.useState(false)
	let[sumData, setSumData] = React.useState(0)
	var content = null;
	let uLA=0,uRA=0,uGA=0;
	let isError = false;
	const filterQuery = "Status eq 'Under Legal Approval' or Status eq 'Under Regional Approval' or Status eq 'Under Global Approval'"
	React.useEffect(() => {
        console.log("loading use effect called")
        console.log('Context=',props.context);
		pnp.setup({
			sp:{
			  baseUrl: props.context.pageContext.web.absoluteUrl
			//   baseUrl: "https://kemetdev.sharepoint.com/sites/ContractManagementLogistics1234/"
			}});
		pnp.sp.web.lists.getByTitle('Open Contracts').items.filter(filterQuery).select('Status').get().then((response) => {
			response.map((item) => {
				item.Status==="Under Legal Approval" ? uLA++ : (item.Status==="Under Regional Approval"? uRA++: uGA++)
			})
			data.datasets[0].data=[uLA, uRA, uGA]
			setLoading(loading=false)
			setSumData(sumData=uLA+uRA+uGA)
		}).catch(() => {
			setError(hasError=true)
		});
    },[loading]) 
  return (
    <div style={{'textAlign': 'center'}}>
		<h5 style={{'height': '1px'}}>WIP status for all contracts till date</h5>
		{/* <a style={{'fontSize':'0.8em'}}>Reload</a><br/> */}
		<button onClick={()=>{event.preventDefault();setLoading(loading=true)}} style={{'fontSize':'0.8em'}}>Reload</button><br/>
	  {loading && !hasError ? <Fabric.Spinner label='Getting data...'></Fabric.Spinner> : (hasError ? <span style={{'lineHeight':'178px','color':'red'}}>something went wrong.</span>: sumData === 0 ? <span style={{'lineHeight':'178px','color':'red'}}>No data to display.</span> :(<Doughnut data={data}></Doughnut>))}

	</div>
  )
}

export default WIPChart
