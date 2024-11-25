import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CodeOfConduct from '../../components/knowledgebase/CodeOfConduct/codeOfConduct'

const code_of_conduct = () => {
  return (
    <View className='flex flex-1'>
			<CodeOfConduct />
	</View>
  )
}

export default code_of_conduct

const styles = StyleSheet.create({})
