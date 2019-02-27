//RST           D9
//SDA(SS)      D10
//MOSI         D11
//MISO         D12
//SCK          D13

#include <SPI.h>
#include <MFRC522.h>

const int RST_PIN = 9;            // Pin 9 para el reset del RC522
const int SS_PIN = 10;            // Pin 10 para el SS (SDA) del RC522
const int GREEN_LED = 8;
const int RED_LED = 7;
const int YELLOW_LED = 4;
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Crear instancia del MFRC522
const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];   // an array to store the received data

boolean insertMode = false;


void printArray(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

void setup()
{
  Serial.begin(9600);      //Inicializa la velocidad de Serial
  SPI.begin();         //Función que inicializa SPI
  mfrc522.PCD_Init();     //Función  que inicializa RFID
  pinMode(4, OUTPUT);
}

void loop()
{

  if (Serial.available() > 0) {
    int input = Serial.parseInt();

    // Input si es 1 está verificado o 0 si no está verificado:
    if (input == 1) {
      digitalWrite(GREEN_LED, HIGH);
      delay(100);
      digitalWrite(GREEN_LED, LOW);
    } else if (!insertMode && input == 2) {
      digitalWrite(YELLOW_LED, HIGH);
      insertMode = true;
    } else  if (insertMode && input == 2) {
      insertMode = false;
      digitalWrite(YELLOW_LED, LOW);
    } else {
      digitalWrite(RED_LED, HIGH);
      delay(100);
      digitalWrite(RED_LED, LOW);
    }

  }

  
  // Detectar tarjeta:
  if (mfrc522.PICC_IsNewCardPresent())
  {
    if (mfrc522.PICC_ReadCardSerial())
    {
      printArray(mfrc522.uid.uidByte, mfrc522.uid.size);
      Serial.println();

      // Finalizar lectura actual
      mfrc522.PICC_HaltA();
    }
  }
  delay(100);
}