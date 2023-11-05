import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../partials/page'
import { getAllRoutes } from "../services/routeService";
import { getTerminals } from "../services/locationService";
import { AddBusModal} from "../componets/modals";

const Trips = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(100);
    const [tableLoad, setTableLoad] = useState(true);
    const [addBusModal, setAddBusModal] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [terminals, setTerminals] = useState([]);

    const handleGoBack = () => {
      navigate(-1);
    };

    const { id } = useParams();

    const toggleAddBusModal = () => {
        setAddBusModal(!addBusModal);
      };
      const fetchTerminals = async () => {
        const { data } = await getTerminals();
      //  console.log(data, 'terminals');
       setTerminals(data?.getTerminals?.nodes)
      };
    
      const fecthRoutes = async () => {
        const { data, loading, errors } = await getAllRoutes(1, 100000);
        if (data) {
        
          setRoutes(data?.getRoutes?.nodes);
         setTimeout(() => {
          setTableLoad(false);
         }, 300);
          setLimit(data?.getRoutes?.nodes?.length);
        }
      };
    
      useEffect(() => {
        fecthRoutes();
        fetchTerminals()
      }, []);
  return (
    <Page>
         <div>
          <button onClick={() => handleGoBack()} className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
      </div>
      <div className="flex items-center justify-between mb-6">
      <h4 className='text-lg font-semibold text-slate-700'>View and manage company trips</h4>
      <button
              className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
              onClick={() => toggleAddBusModal()}
            >
             Add Trip
            </button>
        </div>
        <AddBusModal show={addBusModal}  onHide={toggleAddBusModal} id={id} name={'no name'} callBack={fecthRoutes} terminals={terminals} routes={routes}/>
    </Page>
  )
}

export default Trips