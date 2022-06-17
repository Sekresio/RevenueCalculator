import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addDoc, collection, getDocs} from "firebase/firestore/lite";
import {db} from "../firebase/firebase";

export interface ClientPayment {
    name: string,
    advanceAmount: number,
    advancePaymentDate: Date,
    surchargeAmount: number,
    surchargePaymentDate: Date | null,
    surchargePaid: boolean,
    comment: string
}

interface ClientPaymentState {
    clientPayments: ClientPayment[],
    clientPaymentsStatus: 'loading' | 'succeeded' | 'failed',
    addClientPaymentLoading: boolean
}

const clientPaymentInitialState: ClientPaymentState = {
    clientPayments: [],
    clientPaymentsStatus: 'loading',
    addClientPaymentLoading: false
};

export const loadClientPayments = createAsyncThunk(
    'clientPayments/load',
    async () => {
        const clientPaymentsCollection = collection(db, 'ClientPayments');
        const response = await getDocs(clientPaymentsCollection);
        return response.docs.map(doc => doc.data()).map(r => {
            return {
                name: r.name,
                advanceAmount: r.advanceAmount,
                advancePaymentDate: r.advancePaymentDate?.toDate(),
                surchargeAmount: r.surchargeAmount,
                surchargePaymentDate: r.surchargePaymentDate?.toDate(),
                surchargePaid: r.surchargePaid,
                comment: r.comment
            } as ClientPayment
        })
    });

export const addClientPayment = createAsyncThunk(
    'clientPayments/add',
    async (clientPayment: ClientPayment) => {
        await addDoc(collection(db, 'ClientPayments'), {
            name: clientPayment.name,
            advanceAmount: clientPayment.advanceAmount,
            advancePaymentDate: clientPayment.advancePaymentDate,
            surchargeAmount: clientPayment.surchargeAmount,
            surchargePaymentDate: clientPayment.surchargePaymentDate,
            surchargePaid: clientPayment.surchargePaid,
            comment: clientPayment.comment
        })
    }
)

const clientPaymentSlice = createSlice({
    name: 'clientPaymentSlice',
    initialState: clientPaymentInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadClientPayments.pending, (state) => {
                state.clientPaymentsStatus = 'loading'
            })
            .addCase(loadClientPayments.fulfilled, (state, action) => {
                state.clientPaymentsStatus = 'succeeded'
                state.clientPayments = state.clientPayments = action.payload
            })
            .addCase(loadClientPayments.rejected, (state, action) => {
                state.clientPaymentsStatus = 'failed';
            });
        builder
            .addCase(addClientPayment.pending, (state) => {
                state.addClientPaymentLoading = true;
            })
            .addCase(addClientPayment.fulfilled, (state) => {
                state.addClientPaymentLoading = false;
                state.clientPaymentsStatus = 'loading';
            })
    }
});

export default clientPaymentSlice;