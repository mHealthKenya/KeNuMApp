import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PolicyBrief from '../../components/knowledgebase/policies/brief'

const policy_brief = () => {
  return (
    <View className='flex flex-1'>
			<PolicyBrief />
		</View>
  )
}

export default policy_brief

const styles = StyleSheet.create({})
