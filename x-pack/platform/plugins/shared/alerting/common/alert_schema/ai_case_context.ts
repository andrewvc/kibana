// Types for AI classification and case association in alert context

/**
 * Extend this interface in your alert context to support AI classification and case linkage.
 */
export interface AiCaseAlertContext {
  /**
   * AI-generated classification for the alert (e.g., incident type, severity, etc.)
   */
  aiClassification?: string;

  /**
   * Associated case ID if this alert is linked to a case/incident
   */
  caseId?: string;
}
