import {useAtom} from 'jotai';
import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {internshipPayAtom} from '../../atoms/internship';
import {Pay} from '../../models/pay';

const EcitizenPay = () => {
	const [pay, _] = useAtom(internshipPayAtom);
	const generateHtml = (postData: Pay) => {
		const formData = Object.entries(postData)
			.map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
			.join('');

		return `
      <html>
        <body onload="document.forms[0].submit()">
          <form action="https://pesaflow.ecitizen.go.ke/PaymentAPI/iframev2.1.php" method="POST">
            ${formData}
          </form>
        </body>
      </html>
    `;
	};

	return (
		<WebView
			style={styles.container}
			scalesPageToFit={true}
			originWhitelist={['*']}
			bounces={false}
			javaScriptEnabled
			domStorageEnabled
			source={{
				html: generateHtml(pay!),
			}}
			automaticallyAdjustContentInsets={false}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 1,
	},
});

export default EcitizenPay;
