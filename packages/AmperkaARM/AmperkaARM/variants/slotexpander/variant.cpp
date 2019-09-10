/*
 * This file is a part of Amperka-boards cores.
 *
 * Defines: Slot Expander board definitions.
 * © Amperka LLC (https://amperka.com, dev@amperka.com)
 * 
 * Author: Yury Botov <by@amperka.ru>
 * License: GPLv3, all text here must be included in any redistribution.
 */

#include "pins_arduino.h"

#ifdef __cplusplus
extern "C" {
#endif

// Pin number
const PinName digitalPin[] = {
    PB_1, //D0
    PA_7, //D1
    PA_6, //D2
    PA_5, //D3
    PA_0, //D4
    PA_1, //D5
    PA_2, //D6/TX
    PA_4, //D7
    PA_3, //D8/RX
    PF_0, //D9
    PF_1, //D10/LED
    PA_9, //D11/SCL
    PA_10, //D12/SDA
    // duplicate for analog input pins
    PB_1, //D13/A0
    PA_7, //D14/A1
    PA_6, //D15/A2
    PA_5, //D16/A3
    PA_0, //D17/A4
    PA_1, //D18/A5
    PA_4, //D19/A7
    PA_3, //D20/A8
};

#ifdef __cplusplus
}
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* System Clock Configuration */
WEAK void SystemClock_Config(void) {
    RCC_OscInitTypeDef RCC_OscInitStruct = { 0 };
    RCC_ClkInitTypeDef RCC_ClkInitStruct = { 0 };

    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI | RCC_OSCILLATORTYPE_HSI14;
    RCC_OscInitStruct.HSIState = RCC_HSI_ON;
    RCC_OscInitStruct.HSI14State = RCC_HSI14_ON;
    RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
    RCC_OscInitStruct.HSI14CalibrationValue = 16;
    RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
    RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
    RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL12;
    RCC_OscInitStruct.PLL.PREDIV = RCC_PREDIV_DIV1;
    if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK) {
        while (1)
            ;
    }
    RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK
        | RCC_CLOCKTYPE_PCLK1;
    RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
    RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV1;

    if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_1) != HAL_OK) {
        while (1)
            ;
    }
}

#ifdef __cplusplus
}
#endif
