#!/usr/bin/env python3

import mysql.connector
import serial
import time
import os
import json

count = 0

mydb = mysql.connector.connect(
  host="10.10.40.140",
  user="jakob",
  password="68941",
  database="poraba"
)
mycursor = mydb.cursor()
sql = "INSERT INTO meritve (time, Phase_1_voltage_RMS, Phase_2_voltage_RMS, Phase_3_voltage_RMS, Phase_1_current_RMS, Phase_2_current_RMS, Phase_3_current_RMS , N_Line_calc_current_RMS, Phase_1_Active_Power, Phase_2_Active_Power,Phase_3_Active_Power,Phase_1_Apparent_Power,Phase_2_Apparent_Power,Phase_3_Apparent_Power ,Phase_1_frequency  ,Phase_1_PF , Phase_2_PF , Phase_3_PF) VALUES (CURRENT_TIMESTAMP,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

machine_id = open('/etc/machine-id').readline().strip()

ser = serial.Serial('/dev/ttyS2',
                        baudrate=115200,
                        bytesize=serial.EIGHTBITS,
                        parity=serial.PARITY_ODD,
                        stopbits=serial.STOPBITS_ONE)

def serial_read():
	while True:
		try:
			ser.flush()
			serial_data = ser.readline().decode('utf-8')
			return serial_data
		except:
			print("serial error")
			continue

def insert():
	seconds = int(round(time.time()))
	parsed_data = serial_read().strip().split(",")
	
	d = []
	for e in parsed_data:
		try:
			r = round(float(e),5)
		except:
			r = 0
		d.append(r)

	x =d[6]

	#model 
	if x < 0.08:
		i3 = (3777.91*(x*x*x))+(184.67*x*x)+(0.682*x)
	else:
		i3 = (-128.33706*(x*x*x))+(73.0697992*x*x)+(37.062648*x)
	
	
	#fix power factor
	phi = [0,0,0]
	phi[0] = d[26]
	phi[1] = d[27]
	phi[2] = d[28]
	
	for i,e in enumerate(phi):
		e = abs(e)
		if e > 1:
			e = 1
		phi[i] = e
	#fix freq
	freq = abs(d[8])
	if freq < 40:
		freq = 40
	if freq > 60:
		freq = 60

	VA3 = i3*d[3]
	W3 = VA3*phi[2]

	val =  (
		d[1],
		d[2],
		d[3],
		d[4],
		d[5],
		i3,
		d[7],
		-1*d[17],
		-1*d[18],
		W3,
		d[23],
		d[24],
		VA3,
		freq,
		phi[0],
		phi[1],
		phi[2],
		)
	mycursor.execute(sql, val)
	mydb.commit()
	print(mycursor.rowcount, "was inserted.")
	print(sql,val)

        

while True:
	try:
			insert()
			time.sleep(6)
			count = 0
	except:
			print("error, count:",count)
			count = count +1
			
			if count > 5:
				print("breaking out due to too many errors!")
				break
