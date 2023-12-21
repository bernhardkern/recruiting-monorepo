using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace IITS.ChessElo.Application.Features.Matches;

[JsonConverter(typeof(JsonStringEnumMemberConverter))]
public enum Outcome
{
    [EnumMember(Value = "DRAW")] Draw = 1,

    [EnumMember(Value = "WHITE_WINS")] WhiteWin = 2,

    [EnumMember(Value = "BLACK_WINS")] BlackWin = 3
}