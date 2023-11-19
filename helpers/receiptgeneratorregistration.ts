import dayjs from 'dayjs';
import { RegistrationApplication } from '../models/regapplications';
import { User } from '../models/user';
import { currencyFormatter } from './currency-formatter';

export enum InternshipMode {
	paid = 'paid',
}

export const registrationReceiptGen = (
	item: RegistrationApplication,
	user: User | null,
	mode?: string
) => {
	const html = `
   <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>Invoice ${item.invoice_no}</title>

            <style>
                html,
                body {
                    margin: 10px;
                    padding: 10px;
                    font-family: sans-serif;
                }
                h1,h2,h3,h4,h5,h6,p,span,label {
                    font-family: sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 0px !important;
                }
                table thead th {
                    height: 28px;
                    text-align: left;
                    font-size: 16px;
                    font-family: sans-serif;
                }
                table, th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    font-size: 14px;
                }

                .heading {
                    font-size: 24px;
                    margin-top: 12px;
                    margin-bottom: 12px;
                    font-family: sans-serif;
                }
                .small-heading {
                    font-size: 18px;
                    font-family: sans-serif;
                }
                .total-heading {
                    font-size: 18px;
                    font-weight: 700;
                    font-family: sans-serif;
                }
                .order-details tbody tr td:nth-child(1) {
                    width: 20%;
                }
                .order-details tbody tr td:nth-child(3) {
                    width: 20%;
                }

                .text-start {
                    text-align: left;
                }
                .text-end {
                    text-align: right;
                }
                .text-center {
                    text-align: center;
                }
                .company-data span {
                    margin-bottom: 4px;
                    display: inline-block;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }
                .no-border {
                    border: 1px solid #fff !important;
                }
                .bg-blue {
                    background-color: #414ab1;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <table class="order-details">
                <thead>
                    <tr>
                        <th width="50%" colspan="2">
                            <h2 class="text-start">Nursing Council of Kenya</h2>
                        </th>
                        <th width="50%" colspan="2" class="text-end company-data">
                            <span>Invoice Id: ${item.invoice_no}</span> <br>
                            <span>Date: ${dayjs(new Date()).format(
															'DD-MM-YYYY'
														)}</span> <br>
                           
                            <span>Address: Kilimani, Kabarnet Rd, Nairobi</span> <br>
                              <span>Phone: +254 20 3873556</span> <br>
                        </th>
                    </tr>
                    <tr class="bg-blue">
                        <th width="50%" colspan="2">Details</th>
                        <th width="50%" colspan="2">User Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Invoice Number:</td>
                        <td>${item.invoice_no}</td>

                        <td>Full Name:</td>
                        <td>${user?.Name}</td>
                    </tr>
                    <tr>
                        <td>Cadre:</td>
                        <td>${item.cadre_desc}</td>

                        <td>Email :</td>
                        <td>${user?.Email}</td>
                    </tr>
                    <tr>
                        <td>Education Id:</td>
                        <td>${item.education_id}</td>

                        <td>Phone:</td>
                        <td>${user?.MobileNo}</td>
                    </tr>
                    <tr>
                        <td>Application Date:</td>
                        <td>${dayjs(new Date(item.application_date)).format(
													'DD-MM-YYYY h:mm A'
												)}</td>

                        <td>Index Number:</td>
                        <td>${user?.IndexNo}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th class="no-border text-start heading" colspan="5">
                           ${
															mode === InternshipMode.paid
																? 'Paid Items'
																: 'Payable Items'
														}
                        </th>
                    </tr>
                    <tr class="bg-blue">
                        <th>ID</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="10%">${item.application_id}</td>
                        <td>
                            Cadre ${item.cadre}
                        </td>
                        <td width="10%">${currencyFormatter.format(
													+item.balance_due
												)}</td>
                        <td width="10%">1</td>
                        <td width="15%" class="fw-bold">${currencyFormatter.format(
													+item.balance_due
												)}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="total-heading">Total Amount - <small>Inc. all vat/tax</small> :</td>
                        <td colspan="1" class="total-heading">${currencyFormatter.format(
													+item.balance_due
												)}</td>
                    </tr>
                </tbody>
            </table>

            <br>
            <p class="text-center">
               All the best in your exams
            </p>

        </body>
        </html>
   `;

	return html;
};
