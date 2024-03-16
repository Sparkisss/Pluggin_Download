#include <GyverPID.h>
#include "OneWire.h"
#include "DallasTemperature.h"
#include <ServoSmooth.h>
#include "GParser.h"

// контакт подключения выхода датчика
#define PRESSURE_SENSOR 10
// Данные с датчика давления
#define drawdown digitalRead(PRESSURE_SENSOR)
// флаг сброса сухого хода
boolean flag = false;
boolean pump = true;
// период опроса датчика давления
int periodInfo = 5000;
// период чередования насосов
int periodPump = 10000;
int mode = 0; 

ServoSmooth servo;
// порт подключения датчика температуры 
OneWire oneWire(2);  
DallasTemperature ds(&oneWire);
// PID коэфициенты
GyverPID pid(15.2, 0.8, 0.1);
int period = 5000;

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(1000);
    // настройка контакта подключения датчика давления в режим INTPUT
  pinMode(PRESSURE_SENSOR, INPUT);
  // солинойдный клапан
  pinMode(7, OUTPUT);
  // насос основной
  pinMode(8, OUTPUT);
  // насос резервный
  pinMode(9, OUTPUT);
  ds.begin();
  Serial.setTimeout(50);
  pid.setpoint = 40;
  pid.setDt(period);
  pid.setLimits(0, 180);
  servo.attach(5);
  servo.setSpeed(180);   // ограничить скорость
  servo.setAccel(0.2);  	// установить ускорение (разгон и торможение)
  servo.setDirection(REVERSE);
  servo.smoothStart();
}

void loop() {
  static uint32_t tmr;
  if (millis() - tmr >= period) {
    tmr = millis();
    setSerial();
  }
  if (mode == 0) {
    pressureSensor(period);
  }else if(mode == 1) {
    digitalWrite(8, LOW);
    digitalWrite(9, LOW);
    digitalWrite(7, LOW);
  }else if(mode == 2) {
  } else if (mode != 0 || mode != 1 || mode != 2) {
    Serial.println('Not right value!');
    mode = 0;
  }
  
  parsing();
}
// Отправка данных в SerialPort
void setSerial() {
    int percentsOut = pid.output;
    int percentsFact = servo.getCurrentDeg();
    percentsOut = map(percentsOut, 0, 180, 0, 100);
    percentsFact = map(percentsFact, 0, 180, 0, 100);
    int deg = int(pid.output);

    ds.requestTemperatures();
    pid.input = ds.getTempCByIndex(0);
    pid.getResult();
    servo.tick();
    servo.setTargetDeg(deg);

    Serial.print(round(pid.setpoint)); Serial.print(' ');
    Serial.print(round(pid.input)); Serial.print(' ');
    Serial.print(digitalRead(PRESSURE_SENSOR)); Serial.print(' ');
    Serial.print(digitalRead(7)); Serial.print(' ');
    Serial.print(digitalRead(8)); Serial.print(' ');
    Serial.print(digitalRead(9)); Serial.print(' ');
    Serial.print(percentsFact); Serial.print(' ');
    Serial.print(percentsOut); Serial.print(' ');
    Serial.print(pid.Kp); Serial.print(' ');
    Serial.print(pid.Ki); Serial.print(' ');
    Serial.print(pid.Kd); Serial.println(' '); 
}
// Чтение данных из SerialPort и их обработка
void parsing() {
  if (Serial.available()) {
    char str[30];
    int amount = Serial.readBytesUntil(';', str, 30);
    str[amount] = NULL;
    GParser data(str, ',');
    int ints[1];
    int am = data.parseInts(ints);
    
    switch (ints[0]) {
      case 0: digitalWrite(8, ints[1]); break; //pump 1
      case 1: digitalWrite(9, ints[1]); break; //pump2
      case 2: digitalWrite(7, ints[1]); break; //solinoid valve
      case 3: pid.setpoint = ints[1]; break; //set temp
      case 4: pid.Kp = pid.Kp + (static_cast<float>(ints[1]) / 10.0f); break; //set P
      case 5: pid.Ki = pid.Ki + (static_cast<float>(ints[1]) / 10.0f); break; //set I
      case 6: pid.Kd = pid.Kd + (static_cast<float>(ints[1]) / 10.0f); break; //set D
      case 7: mode = ints[1]; // work mode
    }
  }
}
// обработка датчика давления
void pressureSensor(int periodInfo) {
  static uint32_t tmrPress;
  pumpChange(periodPump);
  if (millis() - tmrPress >= periodInfo) {
    tmrPress = millis();
    if(drawdown == 1 && flag == true) {
      digitalWrite(7, LOW);
      flag = false;
    }else if(drawdown == 0 && flag == false){
      digitalWrite(7, HIGH);
      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      flag = true;
    }
  }
}
// обработка поочередной работы насосов
void pumpChange(int periodPump) {
  static uint32_t tmrPump;

  if (millis() - tmrPump >= periodPump) {
    tmrPump = millis();
    pump = !pump;
      if (pump == true && flag == false) {
        digitalWrite(8, HIGH);
        digitalWrite(9, LOW);
      } else if (pump == false && flag == false) {
        digitalWrite(9, HIGH);
        digitalWrite(8, LOW);
      }
  }
}

