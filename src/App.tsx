import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Mark from './components/Mark';
import Snackbar from 'react-native-snackbar';


const { width, height } = Dimensions.get('window');

function App(): React.JSX.Element {
  const [isGhost, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const resetGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  }

  const onChangeItem = (idx: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
      })
    }
    if (gameState[idx] === 'empty') {
      gameState[idx] = isGhost ? 'Ghost' : 'Pumpkin'
      setIsCross(!isGhost);
    } else {
      Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF'
      })
    }
    checkWinner();
  }

  const checkWinner = () => {
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2] && gameState[0] != 'empty') {
      setGameWinner(`${gameState[0]} is the Winner!`);
    }
    else if (gameState[3] === gameState[4] && gameState[4] === gameState[5] && gameState[3] != 'empty') {
      setGameWinner(`${gameState[3]} is the Winner!`);
    }
    else if (gameState[6] === gameState[7] && gameState[7] === gameState[8] && gameState[6] != 'empty') {
      setGameWinner(`${gameState[6]} is the Winner!`);
    }
    else if (gameState[0] === gameState[3] && gameState[3] === gameState[6] && gameState[0] != 'empty') {
      setGameWinner(`${gameState[0]} is the Winner!`);
    }
    else if (gameState[1] === gameState[4] && gameState[4] === gameState[7] && gameState[1] != 'empty') {
      setGameWinner(`${gameState[1]} is the Winner!`);
    }
    else if (gameState[2] === gameState[5] && gameState[5] === gameState[8] && gameState[2] != 'empty') {
      setGameWinner(`${gameState[2]} is the Winner!`);
    }
    else if (gameState[0] === gameState[4] && gameState[4] === gameState[8] && gameState[0] != 'empty') {
      setGameWinner(`${gameState[0]} is the Winner!`);
    }
    else if (gameState[2] === gameState[4] && gameState[4] === gameState[6] && gameState[2] != 'empty') {
      setGameWinner(`${gameState[2]} is the Winner!`);
    }
    else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw!');
    }
  }

  return (
    <ImageBackground
      source={require('./assets/bg-image.jpg')}
      className='h-screen'
      resizeMode='cover'
    >
      <SafeAreaView className='flex-1 justify-center'>
        <StatusBar />
        {gameWinner != '' ? (
          <View className='my-10 flex items-center'>
            <Text className='text-white text-4xl uppercase font-extrabold tracking-[4px] mb-1'>Tic-Tac-Toe</Text>
            <Text className='text-white text-xl font-semibold'>{gameWinner}</Text>
          </View>
        ) : (
          <View className='my-10 flex items-center'>
            <Text className='text-white text-4xl uppercase font-extrabold tracking-[4px] mb-1'>Tic-Tac-Toe</Text>
            <Text className='text-white text-xl font-semibold'>Player {isGhost === true ? '1' : '2'}'s Turn</Text>
          </View>
        )}
        <View className='items-center'>
          <FlatList className='h-96'
            numColumns={3}
            data={gameState}
            renderItem={({ item, index }) => (
              <Pressable className='border border-white' key={index} onPress={() => onChangeItem(index)} style={{
                minWidth: width * 0.28,
                minHeight: height * 0.12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Mark name={item} />
              </Pressable>
            )}
          />
        </View>
        <TouchableOpacity onPress={resetGame} className='mb-36 flex items-center bg-purple-700 border-none rounded-md mx-28 py-3'>
          <Text className='text-white text-xl shadow-lg shadow-orange-500 font-semibold'>Restart Game</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ImageBackground>

  );
}

export default App;
