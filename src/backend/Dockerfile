FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore src/backend/FrostAura.slnx
RUN dotnet publish src/backend/FrostAura.Api/FrostAura.Api.csproj \
  -c Release \
  -o /app/publish \
  /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .

VOLUME ["/app/data"]

EXPOSE 8080

ENTRYPOINT ["dotnet", "FrostAura.Api.dll"]
