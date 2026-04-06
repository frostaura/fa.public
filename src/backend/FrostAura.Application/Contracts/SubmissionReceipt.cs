namespace FrostAura.Application.Contracts;

public record SubmissionReceipt(
    string ReferenceId,
    string Status,
    bool AutoResponseDelivered,
    bool SupportNotificationDelivered,
    DateTime ReceivedAt);
