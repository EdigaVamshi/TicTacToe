import React, { JSX, PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MarkProps = PropsWithChildren<{
  name: string;
}>

const Mark = ({ name }: MarkProps) => {
  {
    switch (name) {
      case 'Ghost':
        return <Icon name='ghost' style={{transform: [{rotate: '320deg'}]}} size={50} color='white' />

      case 'Pumpkin':
        return <Icon name='halloween' size={60} color='red' />
      default:
        return <Icon name='deathly-hallows' size={50} color='gray' />
    }
  }
}

export default Mark