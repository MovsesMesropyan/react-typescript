import React from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface State {
  model: Model;
}

const params = [
  {
    id: 1,
    name: "Назначение",
    type: "text"
  },
  {
    id: 2,
    name: "Длина",
    type: "text"
  },
  {
    id: 3,
    name: "Ширина",
    type: "text"
  }
];
const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    },
    {
      paramId: 3,
      value: "макси"
    }
  ]
}

const ParamItem: React.FC<{paramItem: ParamValue, params: Param[], onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({
  paramItem, 
  params, 
  onChange
}) => {
  return (
    <div key={paramItem.paramId} className='params-item'>        
      <label>{params.find(param => param.id === paramItem.paramId)?.name}</label>
      <input
        onChange={onChange}
        type="text"
        value={paramItem.value}
      />
    </div>
  );
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: {...props.model}
    };
  }

  public getModel = (): Model => {
    const { model } = this.state;
    console.log(model);
    return model;
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, paramId: number) => {
    this.setState(prevState => {
      return {
          ...prevState,
          model: {
            ...prevState.model,
            paramValues: prevState.model.paramValues.map(m => {
              return m.paramId === paramId ? {...m, value: event.target.value} : m;
            })
          }
      }
    });
  };

  render() {   
    const { params } = this.props;
    const { model: { paramValues } } = this.state;

    return (      
        <div className='editor-wrapper'>  
          {paramValues.map(p => (
            <ParamItem 
              key={p.paramId} 
              paramItem={p} 
              params={params} 
              onChange={(e) => this.handleInputChange(e, p.paramId)} 
            />))
          } 
          <div className='btn-container'>
            <button onClick={this.getModel}>Get Model</button>
          </div>
        </div>    
    );  
  }
}


function App() {
  return (
    <ParamEditor params={params} model={model} />
  );
}

export default App;
