// Incluímos la libreria externa para poder utilizarla
#include <LiquidCrystal.h> // Entre los símbolos <> buscará en la carpeta de librerías configurada
// Definimos las constantes
#define COLS 16 // Columnas del LCD
#define ROWS 2 // Filas del LCD
// Lo primero is inicializar la librería indicando los pines de la interfaz
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];   

void setup() {
  Serial.begin(9600);
  lcd.begin(COLS, ROWS);
  pinMode(7, OUTPUT);
}

void loop() {

  String receivedString;     // read char from serial port    

  if (Serial.available() > 0) {
    
    receivedString = Serial.readString();

    // Limpiamos la pantalla
    lcd.clear();

    // Situamos el cursor en la columna 0 fila 0
    lcd.setCursor(0,0); 
    
    // Escribimos
    lcd.print(receivedString);

    delay(3000); 
    
    // Limpiamos la pantalla
    lcd.clear();
  
    }

  }
  
  
