import React from "react";
import ContainerWrapper from "./ContainerWrapper";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
// const HomeMain = React.lazy(() => import("Components/Home/HomeMain"));

const ItcReconciliation = ({ setCheckedChaseUp }) => {
  return (
    <ContainerWrapper>
      <div>
        <span>Return Period</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                'DateRangePicker',
                'MobileDateRangePicker',
                'DesktopDateRangePicker',
                'StaticDateRangePicker',
                ]}
            >
                <DemoItem label="Desktop variant" component="DesktopDateRangePicker">
                    <DesktopDateRangePicker
                        defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                    />
                </DemoItem>
                <DemoItem label="Mobile variant" component="MobileDateRangePicker">
                    <MobileDateRangePicker
                        defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
      </div>
    </ContainerWrapper>
  );
};

export default ItcReconciliation;
