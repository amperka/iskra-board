/*
 * This file is a part of Amperka-boards cores.
 *
 * Defines: Slot Expander board definitions.
 * © Amperka LLC (https://amperka.com, dev@amperka.com)
 * 
 * Author: Yury Botov <by@amperka.ru>
 * License: GPLv3, all text here must be included in any redistribution.
 */

#ifndef _VARIANT_ARDUINO_STM32_
#define _VARIANT_ARDUINO_STM32_

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

/*----------------------------------------------------------------------------
 *        Pins
 *----------------------------------------------------------------------------*/

#define PB1 0
#define PA7 1
#define PA6 2
#define PA5 3
#define PA0 4
#define PA1 5
#define PA2 6
#define PA4 7
#define PA3 8
#define PF0 9
#define PF1 10
#define PA9 11
#define PA10 12

#define NUM_DIGITAL_PINS 21
#define NUM_ANALOG_INPUTS 8
#define NUM_ANALOG_FIRST 14

// On-board LED pin number
#define LED_BUILTIN PF1
#define LED_GREEN LED_BUILTIN

// On-board user button
#define USER_BTN PF0

// SPI Definitions
#define PIN_SPI_SS PB1
#define PIN_SPI_MOSI PA7
#define PIN_SPI_MISO PA6
#define PIN_SPI_SCK PA5

// I2C Definitions
#define PIN_WIRE_SDA PA10
#define PIN_WIRE_SCL PA9

// Timer Definitions
#define TIMER_TONE TIM17

#define TIMER_SERVO TIM16

// UART Definitions
#define SERIAL_UART_INSTANCE 1

#define PIN_SERIAL_RX PA3
#define PIN_SERIAL_TX PA2

#ifdef __cplusplus
} // extern "C"
#endif
/*----------------------------------------------------------------------------
 *        Arduino objects - C++ only
 *----------------------------------------------------------------------------*/

#ifdef __cplusplus
//
// SERIAL_PORT_MONITOR        Port which normally prints to the Arduino Serial Monitor
//
// SERIAL_PORT_USBVIRTUAL     Port which is USB virtual serial
//
// SERIAL_PORT_LINUXBRIDGE    Port which connects to a Linux system via Bridge library
//
// SERIAL_PORT_HARDWARE       Hardware serial port, physical RX & TX pins.
//
// SERIAL_PORT_HARDWARE_OPEN  Hardware serial ports which are open for use.  Their RX & TX
//                            pins are NOT connected to anything by default.
#define SERIAL_PORT_MONITOR Serial
#define SERIAL_PORT_HARDWARE Serial
#endif

#endif /* _VARIANT_ARDUINO_STM32_ */
