  import React from 'react';
  import { StyleSheet, Text, View, Switch, FlatList, ActivityIndicator } from 'react-native';
  import { CheckBox } from 'react-native-elements'


  export default class App extends React.Component {

    constructor(props){
      super(props);
      this.state ={ isLoading: true, dataSource:[], temperatura: 0, umidade: 0, led: false}
    }

    componentDidMount(){
      setInterval(()=>{
      fetch('https://api.thingspeak.com/channels/878796/feeds.json?api_key=JN2P6FY9JE28ANKC&results=1')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.channels,
            temperatura: responseJson.feeds[0].field2,
            umidade: responseJson.feeds[0].field1,
          });
        })
        .catch((error) =>{
          console.error(error);
        });

        }, 1000)
    }


   toggleSwitch = (value) => {
        this.setState({led: value})
        let ledValue = value ? 1 : 0
        let url = 'https://api.thingspeak.com/update?api_key=PBT9039UPY8H12PC&field1='+ ledValue
        console.log(url)
        fetch(url)
        .catch((error) =>{
          console.error(error);
        });


     }

    render(){

   if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }

    return (
      <View style={styles.container}>

    <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleSwitch}
            value = {this.state.led}/>

  <Text>Temperatura: {this.state.temperatura}</Text>

  <Text>Umidade: {this.state.umidade}</Text>

      </View>
    );
  }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });



