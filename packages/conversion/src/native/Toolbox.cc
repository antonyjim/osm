// Chuck's Toolbox // Open Source // Some Standard to metric conversions
// First Project  // Repo :

//Made by Caughlin Higgins
// Collaberated by :

#include <iostream>
#include <node.h>

using namespace std;

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(
                                  isolate, "world", NewStringType::kNormal)
                                  .ToLocalChecked());
}

namespace conversions
{

void Show_Menu(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    const char *menu_display = "|~~~~~~~~~~~~ CHUCKS TOOLBOX ~~~~~~~~~~~~~|\n\
|~~~~~~~~~~~~ Version 1.1.0  ~~~~~~~~~~~~~|\n\
|~~~~~~~~~~~~ Tools Available : ~~~~~~~~~~|\n\
|~~1~~| |~~2~~| |~~3~~| |~~4~~| |~~5~~|   |\n\
|  $  | |     | |     | |     | |     |   |\n\
CAN2USD |Speed| |     | |     | |     |   |\n\
|       KMH2MPH |Lngth| |     | |     |   |\n\
|               CM2INCH | Vol | |     |   |\n\
|                       LIT2GAL |Temp |   |\n\
|                               CEL2FAR   |\n\
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|\n\
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|\n\
|                               FAR2CEL   |\n\
|                       GAL2LIT | Temp|   |\n\
|               INCH2CM | Vol | |     |   |\n\
|       MPH2KMH |Lngth| |     | |     |   |\n\
USD2CAN |Speed| |     | |     | |     |   |\n\
|  $  | |     | |     | |     | |     |   |\n\
|~~6~~| |~~7~~| |~~8~~| |~~9~~| |~10 ~|   |\n\
|                                         |\n\
|~Enter # greater than 10 to exit program~|\n\
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|\n\
Please Enter Desired Tool # :";

    // Just return the menu
    args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, menu_display, v8::NewStringType::kNormal).ToLocalChecked());
    return;
}

void Handle_Choice(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    int desired_number;
    int argc = args.Length();
    bool do_answer = false;

    // Check for arguments
    if (argc < 1)
    {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "getConversion must be called with at least 1 argument", v8::NewStringType::kNormal).ToLocalChecked()));
        return;
    }
    else if (argc > 2)
    {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "getConversion must be called with at most 2 arguments", v8::NewStringType::kNormal).ToLocalChecked()));
        return;
    }
    else if (argc == 1 && args[0]->IsNumber())
    {
        do_answer = false;
    }
    else if (argc == 2 && args[0]->IsNumber() && args[1]->IsNumber())
    {
        do_answer = true;
    }
    else
    {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "getConversion must be called with number arguments only", v8::NewStringType::kNormal).ToLocalChecked()));
        return;
    }

    // At this point we have at least 1 argument
    desired_number = args[0].As<v8::Number>()->Value();

    if (desired_number == 1)
    {
        if (!do_answer)
        {
            const char *return_string = "You chose tool # 1 - Canadian to USD dollar converter! \n\
Please Enter CAN dollar amount :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_string, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double can_dol_amt = {(double)args[1].As<v8::Number>()->Value()};
            double us_value = {0.0};
            const double can_value = 0.75;
            us_value = can_dol_amt * can_value;
            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
Your Canadian dollar amount is worth %f in USD\n\
*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char return_str[250];
            sprintf(return_str, template_str, can_dol_amt, us_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 2)
    {
        if (!do_answer)
        {
            const char *return_string = "You chose tool # 2 - Kilometers/hour to Miles/hour converter!\n\
Please enter speed in Kilometers : ";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_string, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double speed_km = {(double)args[1].As<v8::Number>()->Value()};
            double speed_ml = {0.0};
            double km_ml_conv = {.621};
            speed_ml = km_ml_conv * speed_km;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
Your speed is equal to %f Miles per hour\n\
*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];

            sprintf(buf, template_str, speed_ml);

            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 3)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 3 - Centimeters to Inches converter! \n\
Please enter your measurement in Centimeters :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double centimeter_value = {(double)args[1].As<v8::Number>()->Value()};
            double inch_value = {0.0};
            double const cm_in_conv = {0.39};

            inch_value = centimeter_value * cm_in_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
%f Centimeters is equal to %f Inches \n\
*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, centimeter_value, inch_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 4)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 4 - Liters to Gallons converter\n\
Please enter amount in Liters :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double liter_value = {0.0};
            double gallon_value = {0.0};
            double const lit_to_gal_conv = {3.785};
            liter_value = {(double)args[1].As<v8::Number>()->Value()};
            gallon_value = liter_value / lit_to_gal_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 %f Liters is equal to %f Gallons\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, liter_value, gallon_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 5)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 5 - Celsius to Fahrenheit\n\
Please enter value in Celsius : ";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double cel_value = {0.0};
            double far_value = {0.0};
            cel_value = {(double)args[1].As<v8::Number>()->Value()};
            ;
            double const cel_conv = {(cel_value * 9 / 5) + 32};
            far_value = cel_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 %f Celsius is equal to %f Fahrenheit\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, cel_value, far_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 6)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 6 - USD to Canadian dollar converter!\n\
Please Enter USD dollar amount :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double usd_dol_amt = {0.0};
            double can_value = {0.0};
            const double usd_value = 1.33;
            usd_dol_amt = {(double)args[1].As<v8::Number>()->Value()};
            ;
            can_value = usd_dol_amt * usd_value;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 Your USD dollar amount is worth %f in Canadian.\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 7)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 7 - Miles/hour to Kilometers/hour converter!\n\
Please enter speed in MPH : ";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double speed_ml = {0.0};
            double speed_km = {0.0};
            double ml_km_conv = {1.6};
            speed_ml = {(double)args[1].As<v8::Number>()->Value()};
            ;
            speed_km = ml_km_conv * speed_ml;
            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 Your speed is equal to %f Kilometers per hour\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, speed_km);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 8)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 8 - Inches to Centimeter converter!\n\
Please enter your measurement in Inches :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double inch_value = {0.0};
            double centimeter_value = {0.0};
            double const in_cm_conv = {2.54};
            inch_value = {(double)args[1].As<v8::Number>()->Value()};
            ;
            centimeter_value = inch_value * in_cm_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 %f Inches is equal to %f Centimeters\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, inch_value, centimeter_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 9)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 9 - Gallons to Liters converter\n\
Please enter amount in Gallons :";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double gallon_value = {0.0};
            double liter_value = {0.0};
            double const gal_to_lit_conv = {3.785};
            gallon_value = {(double)args[1].As<v8::Number>()->Value()};
            liter_value = gallon_value * gal_to_lit_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 %f Gallons is equal to %f Liters\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, gallon_value, liter_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
    }

    else if (desired_number == 10)
    {
        if (!do_answer)
        {
            const char *return_str = "You chose tool # 10 - Fahrenheit to Celsius converter\n\
Please enter value in Fahrenheit : ";
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, return_str, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }
        else
        {
            double far_value = {0.0};
            double cel_value = {0.0};
            far_value = {(double)args[1].As<v8::Number>()->Value()};
            double const far_conv = {(far_value - 32) * 5 / 9};
            cel_value = far_conv;

            const char *template_str = "*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^\n\
 %f Fahrenheit is equal to %f Celsius\n\
^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^";
            char buf[250];
            sprintf(buf, template_str, far_value, cel_value);
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, buf, v8::NewStringType::kNormal).ToLocalChecked());
            return;
        }

        // cout << "Goodbye!..." << endl;
    }
    else
    {
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Goodbye!...", v8::NewStringType::kNormal).ToLocalChecked());
        return;
    }
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module)
{
    NODE_SET_METHOD(exports, "showMenu", Show_Menu);
    NODE_SET_METHOD(exports, "getConversion", Handle_Choice);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
} // namespace conversions