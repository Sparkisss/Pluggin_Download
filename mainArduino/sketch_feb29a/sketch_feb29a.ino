#include <GyverPID.h>
#include "OneWire.h"
#include "DallasTemperature.h"
#include <ServoSmooth.h>

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

ServoSmooth servo;
// порт подключения датчика температуры 
OneWire oneWire(2);  
DallasTemperature ds(&oneWire);
// PID коэфициенты
GyverPID pid(15.2, 0.82, 0);
int period = 500;

void setup() {
  Serial.begin(9600);
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
  Serial.println("input, output, setpoint");
  servo.attach(5);
  servo.setSpeed(180);   // ограничить скорость
  servo.setAccel(0.2);  	// установить ускорение (разгон и торможение)
  servo.setDirection(REVERSE);
  servo.smoothStart();
}

void loop() {
  pressureSensor(period);

  static uint32_t tmr;
  int percentsOut = pid.output;
  int percentsFact = servo.getCurrentDeg();
 
  percentsOut = map(percentsOut, 0, 180, 0, 100);
  percentsFact = map(percentsFact, 0, 180, 0, 100);

  if (millis() - tmr >= period) {
    int deg = int(pid.output);
    tmr = millis();
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
  // parsing();
}

// void parsing() {
//   if (Serial.available() > 1) {
//     char incoming = Serial.read();
//     float value = Serial.parseFloat();
//     switch (incoming) {
//       case 'p': pid.Kp = value; break;
//       case 'i': pid.Ki = value; break;
//       case 'd': pid.Kd = value; break;
//       case 's': pid.setpoint = value; break;
//     }
//   }
// }
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

