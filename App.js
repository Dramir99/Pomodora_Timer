import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput } from 'react-native';

const App = props =>{
  const resetCounter = 59;

  const[originalBreakTimerMinute, setOriginalBreakTimerMinute] = useState(1)
  const[originalBreakTimerSeconds, setOriginalBreakTimerSeconds] = useState(5)

  const[originalTimerMinute, setOriginalTimerMinute] = useState(1)
  const[originalTimerSeconds, setOriginalTimerSeconds] = useState(10)
  //break timer
  const[breakTimerSeconds, setbreakTimerSeconds] = useState(5);
  const[breakTimerMinute, setBreakTimerMinute] = useState(1);

  //work timer
  const[minuteTimer, setMinuteTimer] = useState(1);
  const[timerSeconds, setTimerSeconds] = useState(10);

  //users will type the variables for break timer
  const[breakUserSeconds, setBreakUserSeconds] = useState('');
  const[breakUserMinute, setBreakUserMinute] = useState('');

  //users will type the variables for the work timer
  const[workUserSeconds, setWorktUserSeconds] = useState('');
  const[WorkUserMinutes, setWorkUserMinutes] = useState('');

  //setting the state of the timers
  const [workTimerStopped, setWorkTimerStopped] = useState(true);
  const [breakTimerStopped, setBreakTimerStopped] = useState(false);
  const[timerStopped, setTimerStopped] = useState(true);
  

  useEffect(() => {

    let intervalID = null;
    let minuteID = null;
    
    //over stop timer
    if(!timerStopped){
      //work timer stopper
      if(workTimerStopped){
        
        if(timerSeconds != 0 ){
        intervalID = setInterval(() => {
              
          setTimerSeconds(timerSeconds - 1)

            }, 1000);

        }
        else{
          //if seconds is 0 then check if the minute is greater than one and if it is decrease the minute
          if(minuteTimer == 0 && timerSeconds == 0){

            intervalID = setInterval(() => {
            
            setMinuteTimer(originalTimerMinute);
            setTimerSeconds(originalTimerSeconds);
            setWorkTimerStopped(false);
            setBreakTimerStopped(true);
            
            }, 1000);
          }
          else if(minuteTimer >= 1){
            minuteID = setInterval(() => {
                
            setMinuteTimer(minuteTimer - 1)
            setTimerSeconds(resetCounter)
            }, 1000);
          } 
        }
      }
      //break timer stopper
      else if(breakTimerStopped){

        if(breakTimerSeconds != 0 ){
          intervalID = setInterval(() => {
                
            setbreakTimerSeconds(breakTimerSeconds - 1)
  
              }, 1000);
  
        }
        else{
          //if seconds is 0 then check if the minute is greater than one and if it is decrease the minute
          if(breakTimerMinute == 0 && breakTimerSeconds == 0){
           
            intervalID = setInterval(() => {
             setBreakTimerMinute(originalBreakTimerMinute);
            setbreakTimerSeconds(originalBreakTimerSeconds);            
            setWorkTimerStopped(true);
            setBreakTimerStopped(false);
            
            }, 1000);
          }
          else if(breakTimerMinute >= 1){
            minuteID = setInterval(() => {
                
            setBreakTimerMinute(breakTimerMinute - 1)
            setbreakTimerSeconds(resetCounter)
            }, 1000);

          } 
        }
      }
            
    }
   

    return () => {
      clearInterval(intervalID);
      clearInterval(minuteID);
    };

  });

  return (

    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.viewTimerText}>
        

        <View style={styles.viewTimerText}>
          <Text style={styles.timerText}>{breakTimerMinute}:</Text>
          <Text style={styles.timerText}>{breakTimerSeconds}</Text>
        </View>

        <View style={styles.viewTimerText}>
          <Text style={styles.timerText}>{minuteTimer}:</Text>
          <Text style={styles.timerText}>{timerSeconds}</Text>
        </View>

      </View>
      
      <View>
        <View style={styles.rowTester}>
          <Text style={styles.userText}>Break Timer</Text>
          <View style={styles.viewUserTimerText}>
            <Text style={styles.userText}>Minute:</Text>
            <TextInput  value={breakUserMinute} onChangeText={(text) => setBreakUserMinute(text)} style={styles.userTimerInput} />
          </View>
          
          <View style={styles.viewUserTimerText} >
            <Text style={styles.userText}>Seconds:</Text>
            <TextInput  value={breakUserSeconds} onChangeText={(text) => setBreakUserSeconds(text)} style={styles.userTimerInput} />
          </View>
        </View>

        <Button title="submit break Timer" onPress={() => {
        if(breakUserSeconds){
          setbreakTimerSeconds(Number(breakUserSeconds));
          setOriginalBreakTimerSeconds(breakTimerSeconds);
          setBreakUserSeconds('');
        }
        if(breakUserMinute){
          setBreakTimerMinute(Number(breakUserMinute));
          setOriginalBreakTimerMinute(breakTimerMinute)
          setBreakUserMinute('');
        }
        
        
      }}/>
        <View style={styles.rowTester}>
          <Text style={styles.userText}>Work Timer</Text>
          <View style={styles.viewUserTimerText}>
            <Text style={styles.userText}>Minute:</Text>
            <TextInput  value={WorkUserMinutes} onChangeText={(text) => setWorkUserMinutes(text)} style={styles.userTimerInput} />
          </View>
        
          <View style={styles.viewUserTimerText}>
            <Text style={styles.userText}>Seconds:</Text>
            <TextInput  value={workUserSeconds} onChangeText={(text) => setWorktUserSeconds(text)} style={styles.userTimerInput} />
          </View>
        </View>
        <Button title="submit Work Timer" onPress={() => {
                if(workUserSeconds){
                  setTimerSeconds(Number(workUserSeconds));
                  setOriginalTimerSeconds(timerSeconds)
                  setWorktUserSeconds('');
                }
                if(WorkUserMinutes){
                  setMinuteTimer(Number(WorkUserMinutes));
                  setOriginalTimerMinute(minuteTimer)
                  setWorkUserMinutes('');
                }
                
                
              }}/>
      </View>

      
      
      <Button title="Reset Timer" onPress={() => {
        setTimerSeconds(originalTimerSeconds)
        setMinuteTimer(originalTimerMinute)
        setbreakTimerSeconds(originalBreakTimerSeconds)
        setBreakTimerMinute(originalBreakTimerMinute)
        }}/>

      <Button title={timerStopped ? "start timer" : "stop timer"} onPress={() =>{
        setTimerStopped(!timerStopped)
      }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  rowTester: {
    padding: 5,
  },
  viewTimerText: {
    flexDirection: "row",
    padding: 20,
  },
  viewUserTimerText: {
    flexDirection: "row",
    padding: 5,
    alignItems: 'center'
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#2c3e58',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userText:{
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
    
  },
  timerText: {
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: "row"
  },
  userTimerInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    width: '30%',
    height: 30,
    fontSize: 20,
    color: '#FFF',
    
    marginLeft: 30
  },
});

export default App;