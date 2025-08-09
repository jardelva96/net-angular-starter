namespace WebApi.Contracts.Auth;
public record AuthResponse(string AccessToken, string TokenType, DateTime ExpiresAt);
