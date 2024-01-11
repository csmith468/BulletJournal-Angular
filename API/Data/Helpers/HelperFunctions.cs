using System.Globalization;

namespace API.Helpers {
    public static class HelperFunctions {
        public static string StringTitleCase(string str) {
            var textinfo = new CultureInfo("en-US", false).TextInfo;
            return textinfo.ToTitleCase(str);
        }
    }
}