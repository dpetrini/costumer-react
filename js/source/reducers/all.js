import * as SystemActionTypes from '../actiontypes/all';

// Complete state for app, handled by Redux
const initialState = {

  // Holds the consumption table HSP, monthly consumption and cost
  data: [
    ['HSP', '4.510', '4.990', '4.050', '3.600', '3.190', '2.950', '3.210', '3.710', '3.740', '4.030', '4.990', '4.540'],
    ['Cons. (kWh)', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000','1000','1000'],
    ['Custo (R$)', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000','1000','1000'],
  ],

  // Holds the list of HSP (Sunlinght hours per day) month value for some cities
  cityHsp: {
    'São Paulo': ['4.510', '4.990', '4.050', '3.600', '3.190', '2.950', '3.210', '3.710', '3.740', '4.030', '4.990', '4.540'],
    'Santa Cruz do Rio Pardo': ['5.770', '5.460', '5.090', '4.550', '3.910', '3.690', '3.960', '4.510', '5.130', '5.480', '5.890', '6.270'],
    'Ourinhos': ['5.800', '5.480', '5.070', '4.530', '3.890', '3.640', '3.920', '4.510', '5.120', '5.490', '5.900', '6.290'],
    'Valinhos': ['5.330', '5.560', '5.220', '4.530', '4.060', '3.560', '4.190', '4.580', '4.750', '5.580', '5.860', '5.530'],
    'Curvelo/MG': ['6.160', '5.750', '5.310', '4.830', '4.300', '3.980', '4.180', '4.800', '4.950', '5.280', '5.440', '5.22'],
  },

  // Default values for costumer table (stored in db)
  costumerData: [
    ['João', 'Pereira', '11 22987 2222', 'joaopereira@gmail.com', ''],
    ['Silvia', 'Joao', '11 3322 22332', 'silviajoao@gmail.com', ''],
  ],

  // Default values for quotes table (stored in db)
  quotes: [
    { firstName: 'João', lastName: 'Pereira', sysProposal: '8.3', date: '23/09/2017', totalCost: 'R$ 986,00', status: 'Sent'},
    { firstName: 'Silvia', lastName: 'Joao', sysProposal: '5.3', date: '01/09/2017', totalCost: 'R$ 12.375,00', status: 'Follow-up-1'},
  ],

  // overall config system data
  configData: {
    custokWh: 0.68,
    sombreamento: 0.00,
    azimute: 0.02,
    custoEng: 700,
    custoInsPlaca: 150,
    custoMisc: 0,
    custoEstSolo: 0,
    taxaDisp: 'Bi',
    custoIlumPub: 18,
    eSensor: true,
  },

  // overall calculations system data
  systemData: {
    sysEstimation: 100,
    avgConsumption: 0.00,
    avgCost: 0.00,
    gerCost: 0.00,
    hspFinal: 3.90,
  },

  // result calculations, vector for two possible results
  resultData: [ 
    {
      payback: 1,
      panels: 1,
      kitCost: 1000,
      sysProposal: 0.00,
      ratio: 0.00,
      generation: 0.00,
      totalCost: 0.00,
    },
    {
      payback: 1,
      panels: 1,
      kitCost: 1000,
      sysProposal: 0.00,
      ratio: 0.00,
      generation: 0.00,
      totalCost: 0.00,
    },
  ],

  // Default and example data for Bar graph. Always calculated runtime
  dataGraph: [
    {name: 'Jan', Geração: 4000, Consumo: 2400 },
    {name: 'Fev', Geração: 3000, Consumo: 1398 },
    {name: 'Mar', Geração: 2000, Consumo: 3800 },
    {name: 'Abr', Geração: 2780, Consumo: 3908 },
    {name: 'Mai', Geração: 1890, Consumo: 4800 },
    {name: 'Jun', Geração: 2390, Consumo: 3800 },
    {name: 'Jul', Geração: 3490, Consumo: 4300 },
    {name: 'Ago', Geração: 3000, Consumo: 1398 },
    {name: 'Sep', Geração: 2000, Consumo: 3800 },
    {name: 'Out', Geração: 2780, Consumo: 3908 },
    {name: 'Nov', Geração: 1890, Consumo: 4800 },
    {name: 'Dez', Geração: 2390, Consumo: 3800 },
    {name: 'Média', Geração: 2390, Consumo: 3800 },
  ],

  selectedCostumer: -1, // Selected costumer from list
  selectedResult: 0, // Selected result from result panel
  selectedCity: 'São Paulo', // Selected city for calculations
  proposalSent: false, // Boolean for proposal sent
  authorized: false, // Boolean for User authentication in app
};

// Reducer function
export default function System(state=initialState, action) {	

  console.log(state)
  console.log(action)
	
  switch (action.type) {

    // Set a initial state value for app in loading and after proposal cycle
    case SystemActionTypes.INIT_APP: {
      
      console.log('INIT APP', action.data);
      
      return {
        ...state,
        proposalSent: false,
      };

    }

    // Result actions in return of fetch operations (middleware thunk)
    // *********** Login result OK: authorized
    case SystemActionTypes.LOGIN_SUCCESS: {
          
      console.log('SUCESS LOGIN', action.result);
          
      return {
        ...state,
        authorized: true,
      };
    }
    
    // Login failed
    case SystemActionTypes.LOGIN_NOTFOUND: {
          
      console.log('LOGIN NOT FOUND', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    }    
    
    // Logout successfull
    case SystemActionTypes.LOGOUT_SUCCESS: {
          
      console.log('SUCESS LOGOUT', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    }
    
    // Logout failed
    case SystemActionTypes.LOGOUT_ERROR: {
          
      console.log('LOGOUT ERROR', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    } 

    // ***********  User clicks on Send Proposal button.
    // Get proposal data from db
    case SystemActionTypes.PROPOSAL_GET_DATA_SUCESS: {

      console.log('SUCCESS Get Proposal', action.result);

      // Shape from quotes coming from DB:
      //
      //   const proposalData	= {
      //     _id: element._id, 
      //     firstName: element.Name,
      //     lastName:  element.LastName,
      //     avgConsumption: element.avgConsumption,
      //     sysProposal: element.sysProposal,
      //     panels: element.panels,
      //     totalCost: element.totalCost,
      //     payback: element.payback,
      //     gerCost: element.gerCost,
      //     avgCost: element.avgCost,
      //     status: element.status,
      //     date: element.date,
      //   };
      
      return {
        ...state,
        quotes: action.result,
      };
    }
      
    case SystemActionTypes.PROPOSAL_SEND_SUCCESS: {
          
      console.log('Proposal send with success.', action.result);
          
      return {
        ...state,
        proposalSent: true,
      };
    }    
    
    // Logout successfull
    case SystemActionTypes.PROPOSAL_SEND_FAIL: {
          
      console.log('Error in sending proposal to server.', action.result);
          
      return {
        ...state,
        proposalSent: false,
      };
    }

    // *********** Result panel Actions (graphic and results input form)
    // Update the single visual bar graph with one out of two possible results
    case SystemActionTypes.UPDATE_BAR_GRAPH: {
          
      let localDataGraph = state.dataGraph;
      let row = state.selectedResult;
               
      if (row < 0) 
        row = 0; 
          
      // Calculate generation and load consumption for each month
      localDataGraph.map((element, index) => {
        if (index < 12) {
          element.Geração = parseInt(state.resultData[row].sysProposal * 
                                  parseFloat(state.data[0][index+1]) * // Each month HSP
                                  30.41 *
                                  0.9 *
                                  (1 - state.configData.sombreamento) *
                                  (1 - state.configData.azimute));
          element.Consumo = parseInt(state.data[1][index+1]);
        } else {
          element.Geração = parseInt(state.resultData[row].generation);
          element.Consumo = parseInt(state.systemData.avgConsumption);
        }
          
      })    
          
      return {
        ...state,
        dataGraph: localDataGraph,
      };
    }
          
    // Update the result in ResultPanel Component
    case SystemActionTypes.UPDATE_SELECTED_RESULT: {
      return {
        ...state,
        selectedResult: action.row - 1, // Selected row in result panel
      };
    }

    // *********** Main business logic: all caculations
    // Todo: split in smaller actions
    case SystemActionTypes.UPDATE_DATA: 
    case SystemActionTypes.UPDATE_RESULT_DATA: // Always updating all. To avoid inconsistences 
    {

      const newData = state.data;
      
      //HSP
      let temp = 0;
      for (let i = 1; i < 13; i++) {
        temp += parseFloat(state.data[0][i]);
      }
      temp = temp/12;
      let hspFinal = temp;

      //AVG Consumption
      temp = 0;
      for (let i = 1; i < 13; i++) {
        temp += parseInt(state.data[1][i], 10);
      }
      temp = Math.ceil(temp/12);
      let avgConsumption = temp;

      //Custo conta - multiply consumo por valor do kWh
      temp = 0;
      let temp2 = 0;
      for (let i = 1; i < 13; i++) {
        temp2 = state.data[1][i] * state.configData.custokWh;     
        newData[2][i] = temp2.toFixed(0);
        temp += temp2;
      }
      // AVG
      temp = Math.ceil(temp/12);
      let avgCost = temp;

      //SYS Estimation
      temp = 0;
      let tempCostGer = 0;
      
      if (state.configData.taxaDisp == 'Bi') {

        // temp = media consumo kwh / HSP * Rendimento AP * dias 
        temp = (avgConsumption - 50) / (hspFinal * 0.9 * 30.41 *
                                (1 - state.configData.sombreamento) *
                                (1 - state.configData.azimute)
        );

        // Custo mensal kwh com microgeracao
        tempCostGer = state.configData.custokWh * // hWh cost times...
                      (50 + // Tx disp
                      ((avgConsumption - 50) - // avg consumption -tx disp
                      state.resultData[0].generation)) + // Generation part
                      parseInt(state.configData.custoIlumPub); // plus public lighs
        
      } else if (state.configData.taxaDisp == 'Tri') {

        // temp = media consumo kwh / HSP * Rendimento AP * dias
        temp = (avgConsumption - 100) / (hspFinal * 0.9 * 30.41*
                                (1 - state.configData.sombreamento) *
                                (1 - state.configData.azimute)
        );

        // Custo mensal kwh com microgeracao -same as above but with TRI tx disp
        tempCostGer = state.configData.custokWh *
                    (100 + ((avgConsumption - 100) - 
                    state.resultData[0].generation)) + 
                    parseInt(state.configData.custoIlumPub);
      }

      let sysEstimation = temp;
      let gerCost = tempCostGer;

      // End sys estimation

      const tempSystemData = {
        hspFinal: hspFinal,
        avgConsumption: avgConsumption,
        avgCost: avgCost,
        sysEstimation: sysEstimation,
        gerCost: gerCost,
      };

      // return {
      //   ...state,
      //   data: newData,
      //   systemData: tempSystemData,
      // };
         
      //}

      // case SystemActionTypes.UPDATE_RESULT_DATA: {

      let resultData = state.resultData;
      let systemData = state.systemData;
      let configData = state.configData;

      // Make calculations for both results
      for (let i = 0; i < resultData.length; i++) {
        resultData[i].generation = resultData[i].sysProposal * 
                        systemData.hspFinal *
                        30.41 *
                        0.9 *
                        (1 - configData.sombreamento) *
                        (1 - configData.azimute);
 
        resultData[i].ratio = 100 * resultData[i].generation / 
                        systemData.avgConsumption;
        
        resultData[i].totalCost = (parseInt(resultData[i].kitCost) * 1.35) +
                        (parseInt(resultData[i].panels) * parseInt(configData.custoInsPlaca) ) +
                        parseInt(configData.custoEng) +
                        parseInt(configData.custoMisc);

        resultData[i].payback= (resultData[i].totalCost / 
                               (resultData[i].generation * configData.custokWh) ) / 12;

      }            

      return {
        ...state,
        data: newData,
        systemData: tempSystemData,
        resultData: resultData,
      };
    }


    // *********** Other configuration updates: HSP (sun daily hours per location)
    // Update city name in selection list for HSP
    case SystemActionTypes.UPDATE_CITY_HSP: {

      const newData = state.data;

      Object.keys(state.cityHsp).map(city => {
        if (city === action.city) {
          for (let i = 0; i < 12; i++) {
            newData[0][i+1] = state.cityHsp[city][i];
          }
        }
      })

      return {
        ...state,
        data: newData,
        selectedCity: action.city, // Selected row in result panel
      };
    }


    // Other THUNK MW related actions

    // ***********  Result from Fetch costumers from database to Costumers component
    // Update from db to state.
    case SystemActionTypes.ITEMS_FETCH_DATA_SUCCESS: {

      console.log('SUCCESS FETCH', action.items);

      const costumerData = [];

      action.items.forEach(function(element) {
        const tempData = [
          element.firstName, 
          element.lastName, 
          element.contactNumber, 
          element.email,
          // element._id,
          '',
        ];
        costumerData.push(tempData);
      }, this); 
      
      console.log(costumerData)

      return {
        ...state,
        costumerData: costumerData,
      };
    }

    // Sucessfull new costumer posted to database
    case SystemActionTypes.ITEMS_POST_DATA_SUCCESS: {
      
      console.log('SUCESS POST', action.result);
      
      return {
        ...state,
      };
    }

    // Default state: no changes
    default:
      return state;
  }
}
