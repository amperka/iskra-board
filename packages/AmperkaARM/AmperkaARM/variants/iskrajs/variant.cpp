/*
 * This file is a part of Amperka-boards cores.
 *
 * Defines: Iskra JS board definitions.
 * © Amperka LLC (https://amperka.com, dev@amperka.com)
 * 
 * Author: Yury Botov <by@amperka.ru>
 * License: GPLv3, all text here must be included in any redistribution.
 */

#include "pins_arduino.h"

#ifdef __cplusplus
extern "C" {
#endif

const PinName digitalPin[] = {
    // Arduino "digital" pins
    PB_11, //rx
    PB_10, //tx
    PA_6,
    PA_7,
    PC_3,
    PB_1,
    PB_0,
    PC_2,
    PC_6,
    PC_7,
    PC_8,
    PC_9,
    PA_8,
    PA_10,
    // Arduino i2c extension
    PB_9, //sda
    PB_8, //scl
    // Arduino "upload" 6-pin
    PB_12, //cs
    PB_13, //sck
    PB_14, //miso
    PB_15, //mosi
    // Iskra extra
    PB_6, //led1
    PB_7, //led "busy"
    PC_4, //user button
    // Arduino "analog" pins
    PA_0,
    PA_1,
    PA_2,
    PA_3,
    PA_4,
    PA_5,
    // Duplicate for ADC using
    PA_0,
    PA_1,
    PA_2,
    PA_3,
    PA_4,
    PA_5,
    // ADC in "digital" pin area
    PA_6,
    PA_7,
    PC_3,
    PB_1,
    PB_0,
    PC_2
};

#ifdef __cplusplus
}
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* System Clock Configuration 168MHz with 8MHz quarz */

WEAK void SystemClock_Config(void) {
    RCC_ClkInitTypeDef RCC_ClkInitStruct;
    RCC_OscInitTypeDef RCC_OscInitStruct;

    __HAL_RCC_PWR_CLK_ENABLE();
    __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
    RCC_OscInitStruct.HSEState = RCC_HSE_ON;
    RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
    RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
    RCC_OscInitStruct.PLL.PLLM = 8;
    RCC_OscInitStruct.PLL.PLLN = 336;
    RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
    RCC_OscInitStruct.PLL.PLLQ = 7;
    HAL_RCC_OscConfig(&RCC_OscInitStruct);

    RCC_ClkInitStruct.ClockType = (RCC_CLOCKTYPE_SYSCLK | RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2);
    RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
    RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
    RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;
    HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5);

    if (HAL_GetREVID() == 0x1001) {
        __HAL_FLASH_PREFETCH_BUFFER_ENABLE();
    }
}

#ifdef __cplusplus
}
#endif
