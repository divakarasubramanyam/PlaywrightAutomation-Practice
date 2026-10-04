import { test, expect } from '@playwright/test';

test('Date Picker Functionality', async({page}) => {

    await page.goto('https://demoqa.com/date-picker');

    const targetYear = '2026';
    const targetMonth = 'March';
    const targetDay = '22';
    const dateInput = page.locator('#datePickerMonthYearInput');
    await dateInput.click();

    const yearSelect = page.locator('.react-datepicker__year-select');
    const monthSelect = page.locator('.react-datepicker__month-select');
    await yearSelect.selectOption(targetYear);
    await monthSelect.selectOption({ label: targetMonth });
    const daySelect = page.locator(`.react-datepicker__day--0${targetDay}:not(.react-datepicker__day--outside-month)`);
    await daySelect.click();
    const expectedDate = `03/${targetDay}/${targetYear}`;
    await expect(dateInput).toHaveValue(expectedDate);

    await page.reload();
    await dateInput.fill('03/22/2026');
    await expect(dateInput).toHaveValue("03/22/2026");
});