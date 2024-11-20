import { View, Text } from "react-native";
import { Button, Input, TextArea, Label } from "tamagui";
import DatePicker from 'react-native-date-picker'
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EventCreation() {
    const title = {
        color: "black",
        fontSize: "40px"
    }
    const [date, setDate] = useState(new Date());
    return (
        <View>
            <Text>Create event</Text>
            <Label>Event title *</Label>
            <Input placeholder="Event title" />

            <Label>Event date</Label>
            <View style={{display: "flex", flexDirection: "row"}}>
                <DateTimePicker
                    value={date}
                    mode="date"
                />
                <DateTimePicker
                    value={date}
                    mode="time"
                />
            </View>
            <Label>Event description</Label>
            <TextArea placeholder="Event description" />

            <Label>Event address</Label>
            <Input placeholder="Event address" />

            <Button>Create event</Button>
        </View>
    );
}