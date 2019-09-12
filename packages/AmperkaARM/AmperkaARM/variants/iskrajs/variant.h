/*
 * This file is a part of Amperka-boards cores.
 *
 * Defines: Iskra JS board definitions.
 * © Amperka LLC (https://amperka.com, dev@amperka.com)
 * 
 * Author: Yury Botov <by@amperka.ru>
 * License: GPLv3, all text here must be included in any redistribution.
 */

#ifndef _VARIANT_AMPERKA_STM32_
#define _VARIANT_AMPERKA_STM32_

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

/*----------------------------------------------------------------------------
 *        Pins
 *----------------------------------------------------------------------------*/

// Arduino "digital" pins
#define PB11 0
#define PB10 1
#define PA6 2
#define PA7 3
#define PC3 4
#define PB1 5
#define PB0 6
#define PC2 7
#define PC6 8
#define PC7 9
#define PC8 10
#define PC9 11
#define PA8 12
#define PA10 13
// Arduino i2c extension
#define PB9 14
#define PB8 15
// Arduino "upload" 6-pin
#define PB12 16
#define PB13 17
#define PB14 18
#define PB15 19
// Iskra extra
#define PB6 20
#define PB7 21
#define PC4 22
// Arduino "analog" pins
#define PA0 23
#define PA1 24
#define PA2 25
#define PA3 26
#define PA4 27
#define PA5 28

#define NUM_DIGITAL_PINS 41
#define NUM_ANALOG_INPUTS 12
#define NUM_ANALOG_FIRST 29

// On-board LED pin number
#define LED_BUILTIN PB6
#define LED_GREEN PB7

// On-board user button
#define USER_BTN PC4

// SPI Definitions
#define PIN_SPI_SS PB12
#define PIN_SPI_MOSI PB15
#define PIN_SPI_MISO PB14
#define PIN_SPI_SCK PB13

// I2C Definitions
#define PIN_WIRE_SDA PB9
#define PIN_WIRE_SCL PB8

// Timer Definitions (optional)

#define TIMER_TONE TIM6
#define TIMER_SERVO TIM2

// UART Definitions
#define SERIAL_UART_INSTANCE 2 //Connected to ST-Link

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
#define SERIAL_PORT_HARDWARE Serial1
#endif

// HAL definitions

// enabled on default:
//#define HAL_MODULE_ENABLED
//#define HAL_CORTEX_MODULE_ENABLED
//#define HAL_DMA_MODULE_ENABLED
//#define HAL_FLASH_MODULE_ENABLED
//#define HAL_GPIO_MODULE_ENABLED
//#define HAL_PWR_MODULE_ENABLED
//#define HAL_RCC_MODULE_ENABLED
//#define HAL_ADC_MODULE_ENABLED
//#define HAL_I2C_MODULE_ENABLED
//#define HAL_RTC_MODULE_ENABLED
//#define HAL_SPI_MODULE_ENABLED
//#define HAL_TIM_MODULE_ENABLED

// enable!
#define HAL_DAC_MODULE_ENABLED
#define HAL_ETH_MODULE_ENABLED
#define HAL_SD_MODULE_ENABLED

#endif /* _VARIANT_AMPERKA_STM32_ */
