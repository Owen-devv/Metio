import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'

export const HourlyTemperature = ({ data }) => {
    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), 'ha'),
        temp: Math.round(item.main.temp),
        feel_like: Math.round(item.main.feels_like),
    }))
    return (
        <Card className='flex-1'>
            <CardHeader>
                {/* Hourly Temperature: nhiệt độ hàng giờ */}
                <CardTitle>Nhiệt độ 8 giờ tới</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] w-full">
                <ResponsiveContainer
                    width={"100%"}
                    height={"100%"}
                >
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey={'time'}
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}°C`}
                        />

                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className='rounded-lg border bg-background p-2 shadow-sm'>
                                            <div className='grid grid-cols-2 gap-2'>
                                                <div className='flex flex-col'>
                                                    <span className='text-[0.70rem] uppercase text-muted-foreground'>Nhiệt độ</span>&nbsp;
                                                    <span className='font-bold'>{payload[0]?.value}°</span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-[0.70rem] uppercase text-muted-foreground'>Cảm nhận</span>&nbsp;
                                                    <span className='font-bold'>{payload[1]?.value}°</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#FF6347"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="feel_like"
                            stroke="#1E90FF"
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="5 5"
                        />

                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
